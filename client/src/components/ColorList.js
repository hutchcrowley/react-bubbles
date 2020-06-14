import React, { useState } from 'react'
import Spinner from '../components/Spinner'
import { useHistory } from 'react-router-dom'

import { axiosWithAuth } from '../utils/axiosWithAuth'

const initialColor = {
	color: '',
	code: { hex: '' },
	id: '',
}

const ColorList = ({ colors, updateColors }) => {
	// Initializing the colorState var to state. This will hold the currently selected color to be updated using the .PUT method
	const [ colorState, setColorState ] = useState(initialColor)
	// setting the editing status of the color to edit to state
	const [ editing, setEditing ] = useState(false)
	console.log('colors variable in ColorList component: ', colors)

	// setting the adding status of the color to edit to state
	const [ adding, setAdding ] = useState(false)

	const history = useHistory()

	// <== section for functions related to adding a new color ==>

	// function to toggle visibility of AddForm component
	const addSwitch = e => {
		e.preventDefault()
		setAdding(!adding)
		setEditing(false)
	}

	// helper function to clean up AddForm and send new color information to handleAdd function
	const saveAdd = () => {
		setAdding(false)
		handleAdd(colorState)
	}

	// function that makes a post request to add a new color
	function handleAdd(colorState) {
		axiosWithAuth()
			.post(`/api/colors`, colorState)
			.then(res => {
				updateColors(res.data)
			})
			.then(history.push('/protected'))
			.catch(err => console.log('ERROR: ', err))
	}

	function editColor(color) {
		console.log('color variable in editColor: ', color)
		setEditing(!editing)
		setAdding(false)
		setColorState({
			...colorState,
			id: color.id,
		})
	}

	const handleUpdate = e => {
		e.preventDefault()
		console.log('colorState var in handleUpdate: ', colorState)
		axiosWithAuth()
			.put(`/api/colors/${colorState.id}`, colorState)
			.then(
				axiosWithAuth()
					.get(`/api/colors`)
					.then(res => updateColors(res.data))
					.catch(err => console.log('ERROR: data not returned from API: ', err)),
			)
			.catch(err => console.log('ERROR: data not returned from API: ', err))
	}

	// make a delete request to delete this color
	function deleteColor(color) {
		console.log('FROM ColorList: ', color)
		axiosWithAuth()
			.delete(`/api/colors/${color.id}`)
			.then(res => {
				console.log(res.data)
				const newColors = colors.filter(c => c.id !== color.id)
				updateColors(newColors)
				history.push(`/protected`)
			})
			.catch(err => console.log(err))
	}
	{
		return !colors ? (
			<Spinner />
		) : (
			<div className='colors-wrap'>
				<h2>colors</h2>
				<ul>
					<li>
						<span className='add-wrap' onClick={e => addSwitch(e)}>
							<div className='add'>+</div>
							<p>Add New Color</p>
						</span>
					</li>
					{colors.map(color => (
						<li
							key={color.color}
							onClick={e => {
								e.stopPropagation()
								editColor(color)
							}}
						>
							<span>
								<span
									className='delete'
									onClick={e => {
										e.stopPropagation()
										deleteColor(color)
									}}
								>
									x
								</span>{' '}
								{color.color}
							</span>
							<div className='color-box' style={{ backgroundColor: color.code.hex }} />
						</li>
					))}
				</ul>
				{editing && (
					<form className='edit-wrap' onSubmit={e => handleUpdate(e)}>
						<legend>edit color</legend>
						<label>
							color name:
							<input
								onChange={e => setColorState({ ...colorState, color: e.target.value })}
								value={colorState.color}
							/>
						</label>
						<label>
							hex code:
							<input
								onChange={e =>
									setColorState({
										...colorState,
										code: { hex: e.target.value },
									})}
								value={colorState.code.hex}
							/>
						</label>
						<div className='button-row'>
							<button type='submit'>save</button>

							<button type='button' onClick={() => setEditing(false)}>
								cancel
							</button>
						</div>
					</form>
				)}
				{adding && (
					<form className='add-wrapper' onSubmit={e => saveAdd(e)}>
						<legend>add color</legend>
						<label>
							<p>color name:</p>
							<input
								onChange={e => setColorState({ ...colorState, color: e.target.value })}
								value={colorState.color}
							/>
						</label>
						<label>
							hex code:
							<input
								onChange={e =>
									setColorState({
										...colorState,
										code: { hex: e.target.value },
									})}
								value={colorState.code.hex}
							/>
						</label>
						<div className='button-row'>
							<button type='submit'>Add Color</button>
							<button onClick={() => setAdding(false)}>Cancel</button>
						</div>
					</form>
				)}
			</div>
		)
	}
}

export default ColorList
