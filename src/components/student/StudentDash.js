import React, {useState} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getSeniors } from '../../redux/actions';
import SeniorList from '../senior/SeniorList';
import { Spinner } from 'reactstrap';
import SeniorCard from '../senior/SeniorCard';

const BackgroundDiv = styled.div`
	height: 100vh;
	margin: 0;
	padding: 0;
	font-family: sans-serif;
	background-image: linear-gradient(180deg, #fcb97d 25%, #e07a5f 100%);
`;

const StudentDash = () => {
	const volunteers = useSelector(state => state.seniors);
	const isFetching = useSelector(state => state.isFetching);
	const dispatch = useDispatch();
	const [searchTerm, setSearchTerm] = useState('')
	const [volunteer, setVolunteer]= useState([])

	
	const handleChange = e => {
		setSearchTerm(e.target.value)
	};
	const handleSubmit = e => {
		e.preventDefault();
		dispatch(getSeniors(setVolunteer));
		const results = volunteers.filter(character => {
			return (
				character.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
				character.availability.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});
			setVolunteer(results);
		
	};
	return (
		<BackgroundDiv>
			<form onSubmit={handleSubmit}>
				<input type='search' name='search' value={searchTerm} onChange={handleChange} />
				<button>Search</button>
			</form>
			<div>
				{isFetching ? (
					<div>
						<Spinner />
						<Spinner />
						<Spinner />
					</div>
				) : (
					<div>
						{volunteer.map(person => (
							<div>
								<SeniorCard time={person.availability} location={person.country} />
							</div>
						))}
					</div>
				)}
			</div>
		</BackgroundDiv>
	);
};

export default StudentDash;
