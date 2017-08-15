import PledgeAdapter from '../adapters/pledgeAdapter'
import { getProject } from './projectActions'

export function createPledge(pledgeData) {
  return function (dispatch) {

    dispatch({type:'CREATING_PLEDGE', payload: pledgeData})

    return PledgeAdapter.createPledge(pledgeData)
    .then(pledge => {
      if (pledge.errors) {
        dispatch({type: 'CREATE_PLEDGE_FAILED', payload: pledge.errors})
      } else {
        dispatch({type: 'PLEDGE_CREATED', payload: pledge})
        dispatch(getProject(pledge.project_id))
      }
    })
  }
}
