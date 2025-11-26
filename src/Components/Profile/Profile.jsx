import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { authorizationContext } from '../Context/AuthorizationContextProvider/AuthorizationContextProvider'
import axios from 'axios'
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import useUserData from '../Navbar/useUserData';
import useFetchUserPosts from './useFetchUserPosts';
import { UserPhotoModal } from './UserPhotoModal';
import CreateNewPost from '../CreateNewPost/CreateNewPost';

export default function Profile() {

  const { data, isLoading, isError, error } = useFetchUserPosts()

  const { data: userData } = useUserData()

  const [toggleMenu, setToggleMenu] = useState(false)

  function handleToggleMenu() {
    setToggleMenu(!toggleMenu)
  }

  if (isLoading) return <Loader />

  if (isError) return <p> {error.message} </p>

  const reversedPosts = structuredClone(data || []).reverse()

  return (
    <>
      <main >

        <section className="user py-10 px-5 bg-white flex items-center">

          <div className="user-photo me-3 relative rounded-lg">
            <img className='size-32 rounded-full cursor-pointer' onClick={handleToggleMenu} src={userData?.photo} alt="" />
            {toggleMenu && (
              <div className='absolute top-[105%] '>
                <UserPhotoModal setToggleMenu={setToggleMenu} />
              </div>
            )}
          </div>

          <div className="user-data">
            <p className='mb-3'>
              {userData?.name}
            </p>
            <p>
              {userData?.email}
            </p>
          </div>
        </section>

        <CreateNewPost />

        <section className='posts'>
          {reversedPosts?.map((post) =>
            <Post key={post.id} post={post} />
          )}
        </section>
      </main>
    </>
  )
}
