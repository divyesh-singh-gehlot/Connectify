import React, { useState, useEffect } from 'react'
import client, { databases } from '../../conf/conf2'
import conf from '../../conf/conf1'
import { ID, Query } from 'appwrite'
import '../index.css'
import { FaTrash } from "react-icons/fa";

const Room = () => {

    const [messages, setMessages] = useState([])
    const [messageBody, setMessageBody] = useState('')

    useEffect(() => {
        getMessages()

        const unsubscribe = client.subscribe(`databases.${conf.DatabaseId}.collections.${conf.CollectionIdMessages}.documents`, response =>{
            console.log('Realtime: ',response)

            if(response.events.includes("databases.*.collections.*.documents.*.create")){
                console.log('A MESSAGE WAS CREATED')
                setMessages(prevState => [response.payload, ...prevState])
            }

            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                console.log('A MESSAGE WAS DELETED!!!')
                setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
            }
        });

        return () =>{
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
            body: messageBody
        }

        let response = await databases.createDocument(
            conf.DatabaseId,
            conf.CollectionIdMessages,
            ID.unique(),
            payload
        )
        setMessageBody('')
    }

    return (
        <div className='flex justify-center root-container fixed top-10'>
            <div className='bg-[#121212] w-1/2 h-5/6 my-10 rounded-2xl px-10 shadow-lg shadow-white'>
                <div className='my-3 h-5/6 w-full overflow-scroll no-scrollbar'>
                    <div className='h-full w-full flex flex-col'>
                        {messages.map(messages => (
                            <div key={messages.$id} className=' mt-10 text-lg'>
                                <div className='text-[#888888] ml-3 flex justify-between'>
                                    <p>{new Date(messages.$createdAt).toLocaleString()}</p>
                                    <button className='mr-4' onClick={() => {deleteMessage(messages.$id)}}>
                                    <FaTrash className='hover:fill-[#2A2A3B]' />
                                    </button>
                                </div>
                                <div className='py-5 px-3 bg-[#2A2A3B] rounded-3xl my-2'><span>{messages.body}</span></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div><form onSubmit={handleSubmit}>
                    <div className='flex w-[44vw] gap-3 h-fit fixed bottom-20'>
                        <div className='w-5/6 h-fit'>
                            <input type='text' required maxLength={1000} placeholder='Message'
                                onChange={(e) => { setMessageBody(e.target.value) }}
                                value={messageBody} className='w-full h-14 bg-[#1A1A1A] border-collapse active:boder-[] rounded-3xl px-5' />
                        </div>
                        <div className='h-14 w-1/6'>
                            <input type="submit" value={'Send'} className='bg-[rgba(219,26,90,1)] w-full rounded-3xl h-full text-xl cursor-pointer' />
                        </div>
                    </div>
                </form></div>
            </div>
        </div>
    )
}

export default Room
