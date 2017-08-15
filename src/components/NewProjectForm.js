import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button, Card, Dropdown, Form, Grid, Input, Label, Message, TextArea
} from 'semantic-ui-react'

import Editor from 'draft-js-editor'
import { EditorState, convertToRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'

import { getCategories } from '../actions/categoryActions'
import { createProject, clearErrors } from '../actions/projectActions'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'

class NewProjectForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      funding_goal: '100',
      fund_by_date: moment().add(1, 'days'),
      category_id: '',
      campaign_content: EditorState.createEmpty()
    }
  }

  componentDidMount() {
    this.props.getCategories()
  }

  componentWillUnmount() {
    if (this.props.errors.length > 0) {
      this.props.clearErrors()
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDateChange = (date) => {
    this.setState({
      fund_by_date: date
    });
  }

  handleDropDownChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    })
  }

  handleEditorChange = (campaign_content) => this.setState({campaign_content});

  handleSubmit = (event) => {
    event.preventDefault()

    const projectData = {...this.state}
    projectData.campaign_content = this.stringifyContent(projectData.campaign_content.getCurrentContent())
    this.props.createProject(projectData)
  }

  stringifyContent = (content) => {
    return JSON.stringify(convertToRaw(content))
  }

  categoryOptions = () => {
    const categories = this.props.categories
    return categories.map( (category, index) => {
      return {key:index, text: category.name, value: category.id}
    })
  }

  render() {
    return (
      <Grid centered>
        <Grid.Column mobile={12} tablet={8} computer={6} largeScreen={5} >
          <Card fluid>
            <Card.Content header='Create Project' />

            <Card.Content>
              <Form onSubmit={this.handleSubmit}>

                <Form.Field>
                  <label>Name</label>
                  <input
                    name='name'
                    placeholder='Give your project a name...'
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Description</label>
                  <TextArea
                    name='description'
                    placeholder='Short description of your project...'
                    style={{resize: 'none'}}
                    value={this.state.description}
                    onChange={this.handleInputChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Funding Goal</label>
                  <Input
                    labelPosition='right'
                    placeholder='Amount'
                    name='funding_goal'
                    type='number'
                    min='100'
                    max='1000000000'
                    value={this.state.funding_goal}
                    onChange={this.handleInputChange}
                  >
                    <Label basic>$</Label>
                    <input/>
                    <Label>.00</Label>
                  </Input>
                </Form.Field>

                <Form.Field>
                  <label>Category</label>
                  <Dropdown fluid selection
                    name='category_id'
                    placeholder='Select a Category'
                    value={this.state.category_id}
                    options={this.categoryOptions()}
                    onChange={this.handleDropDownChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Fund By</label>
                  <div style={{display: 'inline-block'}}>
                    <DatePicker
                      className='datePicker'
                      selected={this.state.fund_by_date}
                      onChange={this.handleDateChange}
                      minDate={moment().add(1, 'days')}
                    />
                  </div>
                  <Label pointing='left' style={{top: '8px'}}>
                    {this.state.fund_by_date.diff(moment(), 'days') + 1 + ' days'}
                  </Label>
                </Form.Field>

                <Button
                  type='submit'
                  color='green'
                  loading={this.props.creatingProject}
                >
                  Create Project
                </Button>
              </Form>
            </Card.Content>

            {this.props.errors.length > 0 ?
              <Message list={this.props.errors} error attached /> : null
            }

          </Card>
        </Grid.Column>

        <Grid.Column stretched mobile={12} tablet={8} computer={10} largeScreen={11}>
          <Card fluid>
            <Card.Content style={{padding: '42px'}}>
              <Editor
                placeholder='Let people know why your project is awesome...'
                onChange={this.handleEditorChange}
                editorState={this.state.campaign_content}
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {...state.newProjectForm, categories: state.categories}
}

export default connect(mapStateToProps, {getCategories, createProject, clearErrors})(NewProjectForm)
