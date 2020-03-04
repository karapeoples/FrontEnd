import React from 'react';
import { useParams } from 'react-router-dom'
import { axiosWithAuth } from '../../utils/axiosWithAuth'
import { useDispatch, useSelector } from 'react-redux';
import {  getTasks } from '../../redux/actions';
import {  Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

const TaskEditForm = ({ taskToEdit, setTaskToEdit, toggle }) => {
	const tasks = useSelector(state => state.tasks)
	const { id } = useParams()
	const dispatch = useDispatch()

	const putTask = e => {
		e.preventDefault()
		axiosWithAuth()
			.put(`/admin/${id}/todos`, taskToEdit)
			.then(res => {
				console.log('response', res);
				setTaskToEdit(tasks.map(task => {
					if (task.id === res.data.id) {
						console.log('SUCCESS')
						setTaskToEdit({ title: '', description: '', volunteer_id: '' })
						return res.data
					} else {
						console.log('ERROR')
						return task
					}
				}))
			})
			.catch(err => console.log(err));
		dispatch(getTasks())
		toggle()
	};
   
	return (
		<div className='editForm > nonForm'>
					<AvForm onSubmit={putTask}>
						<AvField
							label='Title'
							type='text'
							name='title'
							id='title'
							placeholder='Please enter task title here'
							value={taskToEdit.title}
							onChange={e => setTaskToEdit({ ...taskToEdit, title: e.target.value })}
							validate={{
								required: {
									value: true,
									errorMessage: 'A title is required to assign a new task',
								},
							}}
						/>
						<AvField
							label='Description'
							type='textarea'
							name='description'
							id='description'
							placeholder='Please enter task description'
							value={taskToEdit.description}
							onChange={e => setTaskToEdit({ ...taskToEdit, description: e.target.value })}
							validate={{
								required: {
									value: true,
									errorMessage: 'A task description is required to assign a new task',
								},
							}}
						/>
						<AvField
							label='Volunteer ID'
							type='number'
							name='volunteer_id'
							id='volunteer_id'
							placeholder='Please enter a valid Volunteer ID'
							value={taskToEdit.volunteer_id}
							onChange={e => setTaskToEdit({ ...taskToEdit, volunteer_id: e.target.value })}
							validate={{
								required: {
									value: true,
									errorMessage: 'A valid Volunteer ID is required to assign a new task',
								},
							}}
						/>
						<Button outline='secondary' className='formButton2'>Submit Edit</Button>
					</AvForm>
				</div>
			);
}

export default TaskEditForm