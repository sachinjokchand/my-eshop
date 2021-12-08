import React from 'react'
import { Pagination } from 'react-bootstrap'

const Paginate = ({ pages, page, submitHandler }) => {
    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) =>
                <Pagination.Item key={x} onClick={() => submitHandler(x + 1)} active={page === x + 1}>{x + 1}</Pagination.Item>

            )}
        </Pagination>
    )
}

export default Paginate
