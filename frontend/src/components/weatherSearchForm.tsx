import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "./weatherSearchForm.scss";
import states from "./states.json";

const WeatherSearchForm = ({ onSubmit }) => {
	const [stateList, setStateList] = useState<React.JSX.Element[]>([]);

	useEffect(() => {
		const stateOptions = Object.entries(states).map(([name, abbreviation]) => (
			<option key={abbreviation} value={abbreviation}>
				{name}
			</option>
		));
		setStateList(stateOptions);
	}, []);

	return (
		<Container className="mt-4 weather-search-form-container">
			<div className="weather-search-title mt-2 mb-4">
				<h2>Weather Search 🌤️</h2>
			</div>
			<Form className="weather-search-form" onSubmit={onSubmit}>
				<Form.Group as={Row} className="mb-1" controlId="formStreet">
					<Form.Label column sm={2} xs={12} className="required">
						Street
					</Form.Label>
					<Col sm={10} xs={12}>
						<Form.Control type="text" placeholder="Enter street" required />
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-1" controlId="formCity">
					<Form.Label column sm={2} xs={12} className="required">
						City
					</Form.Label>
					<Col sm={10} xs={12}>
						<Form.Control type="text" placeholder="Enter city" required />
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-1" controlId="formState">
					<Form.Label column sm={2} xs={12} className="required">
						State
					</Form.Label>
					<Col sm={10} xs={12} className="w-50 state-select">
						<Form.Control as="select" required defaultValue="">
							<option value="" disabled>Select your state</option>
							{ stateList }
						</Form.Control>
					</Col>
				</Form.Group>

				<div className="split-line"></div>

				<Form.Group as={Row} className="mb-3" controlId="formOptions">
					<Col sm={{ span: 10, offset: 2 }} xs={12}>
						<Form.Check type="checkbox" label="Autodetect Location" />
						<Form.Check type="checkbox" label="Current Location" className="mt-1" />
					</Col>
				</Form.Group>

				{/* Buttons */}
				<Form.Group as={Row} className="mb-3">
					<Col sm={{ span: 10, offset: 2 }} xs={12}>
						<Button variant="primary" type="submit" className="me-2">
							Search
						</Button>
						<Button variant="secondary" type="reset">
							Clear
						</Button>
					</Col>
				</Form.Group>
			</Form>
		</Container>
	);
};

export default WeatherSearchForm;
