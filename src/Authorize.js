import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default function (ComposedComponent, inheritedProps) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }
    componentDidMount () {
      if(!localStorage.getItem('token')){
        this.context.router.history.push('/login')
      }
    }
    componentWillUpdate () {
      if(!localStorage.getItem('token')){
        this.context.router.history.push('/login')
      }
    }
    render(){
      return <ComposedComponent  {...inheritedProps} />
    }
  }
  return Authentication
}
