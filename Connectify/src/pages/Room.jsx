import React, { useState, useEffect } from 'react'
import client, { databases } from '../../conf/conf2'
import conf from '../../conf/conf1'
import { ID, Permission, Query, Role } from 'appwrite'
import '../index.css'
import { FaTrash } from "react-icons/fa";
import Navbar from './Navbar.jsx'
import { useAuth } from '../utilities/AuthContext.jsx'
import FormattedDate from '../Components/FormattedDate.jsx'

const Room = () => {

    const { user } = useAuth()

    const [messages, setMessages] = useState([])
    const [messageBody, setMessageBody] = useState('')

    useEffect(() => {
        getMessages()

        const unsubscribe = client.subscribe(`databases.${conf.DatabaseId}.collections.${conf.CollectionIdMessages}.documents`, response => {
            console.log('Realtime: ', response)

            if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                console.log('A MESSAGE WAS CREATED')
                setMessages(prevState => [response.payload, ...prevState])
            }

            if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                console.log('A MESSAGE WAS DELETED!!!')
                setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
            }
        });

        return () => {
            unsubscribe()
        }

    }, [])



    const getMessages = async () => {
        const response = await databases.listDocuments(conf.DatabaseId,
            conf.CollectionIdMessages,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(100),
            ]
        )
        setMessages(response.documents)
    }

    const deleteMessage = async (message_id) => {
        await databases.deleteDocument(conf.DatabaseId, conf.CollectionIdMessages, message_id);
    }



    const handleSubmit = async (e) => {
        e.preventDefault()
        let payload = {
            user_id: user.$id,
            username: user.name,
            body: messageBody
        }

        let permissions = [
            Permission.write(Role.user(user.$id))
        ]

        let response = await databases.createDocument(
            conf.DatabaseId,
            conf.CollectionIdMessages,
            ID.unique(),
            payload,
            permissions
        )
        setMessageBody('')
    }

    console.log(messages.isUser)

    return (
        <div>
            <Navbar />
            <div className='flex justify-center root-container fixed top-10'>
                <div className='bg-[#121212] xl:w-1/2 h-5/6 w-5/6 my-10 md:w-5/6 md:mt-20 xl:mt-10 rounded-2xl px-5 xl:px-10 md:px-10 shadow-lg shadow-white'>
                    <div className='my-3 h-5/6 w-full overflow-scroll no-scrollbar'>
                        <div className='h-full w-full flex flex-col'>
                            {messages.map((message) => (
                                <div key={message.$id} className='md:mt-10 mt-5 xl:mt-10 text-sm md:text-lg xl:text-lg h-fit w-full'>
                                    <div className='text-[#888888] xl:ml-3 flex justify-between'>
                                        <div className='flex flex-col md:flex-row xl:flex-row'>
                                            {message?.username ? (
                                                <span className='text-sm md:text-xl xl:text-xl xl:font-semibold text-white mr-5'>{message.username}</span>
                                            ) : (
                                                <span className='text-sm md:font-semibold xl:font-semibold text-white mr-5'>Anonymous User</span>
                                            )}
                                            <span><FormattedDate createdAt={message.$createdAt} /></span>
                                            </div>

                                        {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                                            <button
                                                className='mr-4'
                                                onClick={() => {
                                                    deleteMessage(message.$id);
                                                }}
                                            >
                                                <FaTrash className='hover:fill-[#2A2A3B]' />
                                            </button>
                                        )}
                                    </div>

                                    <div
                                        className={`py-5 px-3 w-full rounded-3xl my-2 message-body ${message.user_id === user.$id ? 'bg-[#2A2A3B]' : 'bg-[#1E1E2F]'
                                            }`}
                                    >
                                        <span className='w-full'>{message.body}</span>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className='w-full h-fit'><form onSubmit={handleSubmit}>
                        <div className='flex xl:w-[44vw] bottom-15 gap-3 h-fit fixed xl:bottom-20 md:bottom-44 md:w-[75vw]'>
                            <div className='w-4/6 h-fit md:5/6 lg:w-5/6'>
                                <input type='text' required maxLength={1000} placeholder='Message'
                                    onChange={(e) => { setMessageBody(e.target.value) }}
                                    value={messageBody} className='w-full xl:h-14 h-10 md:h-20 bg-[#1A1A1A] border-collapse active:boder-[] rounded-3xl px-5' />
                            </div>
                            <div className='xl:h-14 md:h-20 w-2/6 h-10 md:w-1/6 lg:1/6'>
                                <input type="submit" value={'Send'} className='bg-[rgba(219,26,90,1)] w-full rounded-3xl h-full text-sm md:text-xl xl:text-xl cursor-pointer' />
                            </div>
                        </div>
                    </form></div>
                </div>
            </div>
        </div>
    )
}

export default Room
