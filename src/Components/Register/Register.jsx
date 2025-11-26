import styles from './Register.module.css'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer, Zoom } from 'react-toastify';


const formSchema = zod.object({
  name: zod.string().min(3, "Min 3 letters").max(20, "ZOD: Max 20"),

  email: zod.string().email("invalid email").nonempty("must enter mail"),

  password: zod.string().min(6, "Password must be at least 6 characters"),
  // .regex(
  //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
  //   "Password must contain letters and numbers"
  // )
  rePassword: zod.string().min(6, "Password must be at least 6 characters"),
  // .regex(
  //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
  //   "Password must contain letters and numbers"
  // )

  dateOfBirth: zod.coerce
    .date('must enter date')
    .refine((userDate) => {
      return new Date() - userDate >= 0;
    }, "Invalid date, future date")
    .refine((value) => {
      return new Date().getFullYear() - value.getFullYear() >= 18;
    }, "age must be older than 18")
    .transform((dateObj) => {
      return `${dateObj.getMonth() + 1}-${dateObj.getDate()}-${dateObj.getFullYear()}`;
    }),

  gender: zod.enum(["male", "female"]),

  // country: zod.enum(["Egypt", "KSA", "USA"]),
})
  .refine(
    (values) => {
      return values.password === values.rePassword;
    },
    {
      message: "Passwords must be identical ",
      path: ["rePassword"],
    }
  )
  .loose();


export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const nameField = useRef(null)

  const { formState, handleSubmit, register, watch } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: ''
    },
    mode: 'onBlur',
    resolver: zodResolver(formSchema)
  })
  const navigateTo = useNavigate()

  function customHandleFunction(data) {
    console.log('success', data);
    setIsLoading(true)
    axios.post('https://linked-posts.routemisr.com/users/signup', data)
      .then((res) => {
        console.log(res)
        navigateTo('/login')
      })
      .catch((res) => {
        console.log(res);
        toast.error(`${res.response.data.error}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Zoom,
        });
      })
      .finally(()=>{
        setIsLoading(false)
      })
  }


  return (
    <>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Zoom}
      />

      <div className=' flex flex-col justify-center items-center h-full  '>

        <p className='text-center font-bold text-4xl md:text-6xl  '>Hey, Welcome</p
        >
        <p className='text-center  md:mt-5 text-stone-700'>Create your account, it's simple and easy</p>

        <form className={`w-[80%] mx-auto md:mt-5`} onSubmit={handleSubmit(customHandleFunction)}>

          <div className="relative">
            <input
              {...register('name')}
              type="text" id="name"
              className="block  text-black dark:text-black px-2.5 pb-2.5 pt-4 w-full text-sm  bg-transparent rounded-lg border-1 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              autoComplete='name'
            />
            <label htmlFor="name" className='label bg-background '>
              Name:
            </label>
            {
              formState.errors.name && formState.touchedFields.name
              &&
              (<p className='error z-20'>
                {formState.errors.name.message}
              </p>)
            }
          </div>

          <div className="relative my-2 md:my-4">
            <input {...register('email')} type="text" id="email" className="block  text-black dark:text-black px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="email"
              className="label bg-background  ">
              Email:
            </label>
            {
              formState.errors.email && formState.touchedFields.email
              &&
              (<p className='error z-20'>
                {formState.errors.email.message}
              </p>)
            }
          </div>

          <div className="relative md:my-4">
            <input {...register('password')} type="password" id="password" className="block  text-black dark:text-black px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="password"
              className="label bg-background z-20">
              Password:
            </label>
            {
              formState.errors.password && formState.touchedFields.password
              &&
              (<p className='error z-20'>
                {formState.errors.password.message}
              </p>)
            }
          </div>

          <div className="relative my-2 md:my-4">
            <input {...register('rePassword')} type="password" id="rePassword"
              className="block  text-black dark:text-black px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="rePassword"
              className="label bg-background">
              Password Conformation:
            </label>
            {
              formState.errors.rePassword && formState.touchedFields.rePassword
              &&
              (<p className='error z-20'>
                {formState.errors.rePassword.message}
              </p>)
            }
          </div>

          <div className=' md:mt-3 relative'>
            <input type="date" id='date' {...register('dateOfBirth')} placeholder='Date of birth:'
              className='block  text-black dark:text-black px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' />
            <label htmlFor="date" className='label bg-background font-bold'>Date of birth:</label>
            {
              formState.errors.dateOfBirth && formState.dirtyFields.dateOfBirth
              &&
              (<p className='error z-20'>
                {formState.errors.dateOfBirth.message}
              </p>)
            }
          </div>

          <div className=' my-3 md:my-6 relative flex'>
            <div>
              <input type="radio" name="gender" id="male" value={'male'} {...register('gender')} />
              <label htmlFor="male" className='ms-2'>Male</label>
            </div>
            <div className='ms-3'>
              <input type="radio" name="gender" id="female" value={'female'} {...register('gender')} />
              <label htmlFor="female" className='ms-2'>Female</label>
            </div>
            {
              formState.errors.gender && formState.touchedFields.gender
              &&
              (<p className='error z-20'>
                {formState.errors.gender.message}
              </p>)
            }
          </div>

        {isLoading ? (
            <button
              disabled
              type="button"
              dark:bg-blue-600
              className={` ${styles.btnGrad} w-full cursor-pointer font-bold text-2xl`}
            >
              <svg
                svg
                aria-hidden="true"
                role="status"
                className="inline size-5   me-3  mb-1 text-[#e5e5e5] animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className={` ${styles.btnGrad} w-full cursor-pointer font-bold text-2xl`}
            >
              Sign Up
            </button>
          )}

        </form>

        <p className='mt-2'>
          Do you have an account?
          <span className='ms-2'>
            <Link to={`/login`} className='hover:underline'>
              Sign In
            </Link>
          </span>
        </p>

      </div>

    </>
  )
}
