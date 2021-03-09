import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'something comes to happen',
        author: 'Peter Wu',
        user: {
            username: 'peter'
        }
    }

    const user = {
        username: 'peter'
    }

    const component = render(
        <Blog blog={blog} user={user} />
    )

    // component.debug()

    // const h1 = component.container.querySelector('h1')
    // console.log(prettyDOM(h1))

    // expect(component.container).toHaveTextContent(
    //     'something comes to happen'
    // )

    // const element = component.getByText(
    //     'something comes to happen'
    // )
    // expect(element).toBeDefined()

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
        'something comes to happen'
    )
})

test('clicking the button checks url and likes of blog', () => {
    const blog = {
        title: 'something comes to happen',
        author: 'Peter Wu',
        likes: 0,
        user: {
            username: 'peter'
        }
    }

    const user = {
        username: 'peter'
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={user} addLike={mockHandler} />
    )

    const button = component.getByText('like')
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})