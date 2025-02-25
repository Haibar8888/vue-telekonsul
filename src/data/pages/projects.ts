import api from '../../services/api'
import { Project } from '../../pages/projects/types'

export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: 'project_owner' | 'team' | 'created_at'
  sortingOrder: 'asc' | 'desc' | null
}

export const getProjects = async (options: Partial<Sorting> & Pagination) => {
  const projects: Project[] = await fetch('../../../public/projects-db.json').then((r) => r.json())

  return {
    data: projects,
    pagination: {
      page: options.page,
      perPage: options.perPage,
      total: projects.length,
    },
  }
}

// export const getProjects = async (options = { page: 1, perPage: 10 }) => {
//   const response = await fetch('../../../public/projects-db.json') // Ganti dengan path yang benar
//   const projects = await response.json()

//   console.log('projects:', projects)

//   // Paginasi dengan nilai default
//   const { page, perPage } = options
//   const total = projects.length
//   const start = (page - 1) * perPage
//   const paginatedProjects = projects.slice(start, start + perPage)

//   return {
//     data: paginatedProjects,
//     pagination: {
//       page,
//       perPage,
//       total,
//     },
//   }
// }

export const addProject = async (project: Omit<Project, 'id' | 'created_at'>) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  return fetch(api.allProjects(), { method: 'POST', body: JSON.stringify(project), headers }).then((r) => r.json())
}

export const updateProject = async (project: Omit<Project, 'created_at'>) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  return fetch(api.project(project.id), { method: 'PUT', body: JSON.stringify(project), headers }).then((r) => r.json())
}

export const removeProject = async (project: Project) => {
  return fetch(api.project(project.id), { method: 'DELETE' })
}
