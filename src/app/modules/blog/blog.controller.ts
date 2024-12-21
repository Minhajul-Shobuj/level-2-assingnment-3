/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import { RequestHandler } from 'express'
import catchAsync from '../../utiles/catchAsync'
import { BlogService } from './blog.service'
import sendResponse from '../../utiles/sendResponse'
import httpStatus from 'http-status'
import { Blog } from './blog.model'
import {
  checkAuthorIsValid,
  checkGivenId,
  checkRoleIsValid,
  isBlogExist,
} from './blog.utiles'

const createBlog: RequestHandler = catchAsync(async (req, res) => {
  checkRoleIsValid(req.user?.role)
  const result = await BlogService.createBlogInDB(req.body)
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully Posted a Blog',
  })
})
const getAllBlogs: RequestHandler = catchAsync(async (req, res) => {
  const result = await BlogService.getAllBlogFromDB(req.query)
  sendResponse(res, {
    success: true,
    data: result,
    message: 'Successfully get all Blogs from database',
    statusCode: httpStatus.OK,
  })
})
const updateBlog: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  checkGivenId(id)
  await isBlogExist(id)
  checkRoleIsValid(req.user?.role)
  const blog = await Blog.findById(id).populate('author')
  const { email: authorEmail } = blog?.author as any
  const userEmail = req.user?.email
  console.log(authorEmail, userEmail)
  checkAuthorIsValid(userEmail, authorEmail)

  const result = await BlogService.updateBlogInDb(id, req.body)
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
  })
})
const deleteBlog: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  checkGivenId(id)
  await isBlogExist(id)
  checkRoleIsValid(req.user?.role)
  const blog = await Blog.findById(id).populate('author')
  const { email: authorEmail } = blog?.author as any
  const userEmail = req.user?.email
  checkAuthorIsValid(userEmail, authorEmail)
  await BlogService.deleteBlogFromDb(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
  })
})

export const BlogController = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
}
