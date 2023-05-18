import axios, { AxiosInstance, AxiosStatic } from 'axios'
import { createContext } from 'react'

const AuthContext = createContext<AxiosInstance | AxiosStatic>(axios)

export { AuthContext }
