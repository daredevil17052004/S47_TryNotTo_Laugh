import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import styles from './main.module.css'

const Main = () => {
    const [data, setData] = useState([])
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState('')
    const navigate = useNavigate()

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const res = await axios.get('http://localhost:4200/')
    //             setData(res.data)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     fetchData()
    // }, [])

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await axios.get('http://localhost:4200/users')
                setUsers(res.data)
                console.log(users)
            } catch (err) {
                console.log(err)
            }
        }
        fetchUsers()
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:4200/deleteUser/' + id)
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    const handleSelectUser = (userId) => {
        setSelectedUser(userId)
        console.log(selectedUser)
    }

    return (
        <div className={styles.main}>
            <div className={styles.title}>
                Try_Not_To_Laugh
            </div>
            <div className={styles.add}>
                <Link to='/form'>
                    <button>Add your own meme</button>
                </Link>
                <Link to='/loginForm'>
                    <button>Login</button>
                </Link>
            </div>
            <div className={styles.select}>
                
                .
            </div>
            <div className={styles.memes}>
            {users  
                .filter(item => !selectedUser || item.created_by === selectedUser) // Filter memes by selected user
                .map((item) => (
                    <div key={item._id} className={styles.meme}>
                        {item.Serial} <br />
                        {item.Memes}
                        <div>
                            Like:{item.Like} <br />
                            Dislike:{item.Dislike}
                        </div>
                        <div>
                            Created_by:{item.created_by}
                        </div>
                        <div className={styles.buttons}>
                            <button onClick={() => handleDelete(item._id)}>Delete</button>
                            <button onClick={() => navigate(`/update/${item._id}`, { state: { item } })}>Edit</button>
                            <br />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Main
