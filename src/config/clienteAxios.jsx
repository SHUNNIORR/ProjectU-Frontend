import axios from 'axios'

export const clienteAxios = axios.create({
    baseURL:`http://localhost:4000/api`
})

export const clienteAxiosProyectos = axios.create({
    baseURL:`http://localhost:4001/api`
})
export const clienteAxiosTarea = axios.create({
    baseURL:`http://localhost:4002/api`
})

