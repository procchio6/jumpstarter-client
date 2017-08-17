import React, { Component }  from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class PaginationLinks extends Component {

  render() {
    const { data, currentPage, match } = this.props
    const totalPages = Math.ceil(data.total/data.perPage)

    if (totalPages <= 1 || !totalPages || currentPage > totalPages) {
      return null
    }

    return (
      <div style={{textAlign: 'center', marginTop: '24px'}}>
        <Menu pagination>
          {
            data.prev ?
            <Menu.Item name='Back'
              as={Link}
              to={`${match.path}?page=${parseInt(currentPage, 10) - 1}`}
            /> : null
          }
          <Menu.Item disabled >{`${currentPage} / ${totalPages}`}</Menu.Item>
          {
            data.next ?
            <Menu.Item name='Next'
              as={Link}
              to={`${match.path}?page=${parseInt(currentPage, 10) + 1}`}
            /> : null
          }
        </Menu>
      </div>
    )
  }
}

export default PaginationLinks
