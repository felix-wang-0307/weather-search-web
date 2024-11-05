import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "./weatherSearchForm.scss";

const WeatherSearchForm = () => {
	return (
		<Container className="mt-4 ps-4 pe-4 weather-search-form-container">
			<div className="weather-search-title mt-2 mb-4">
				<h2>Weather Search 🌤️</h2>
			</div>
			<Form className="weather-search-form">
				{/* Street Field */}
				<Form.Group as={Row} className="mb-3" controlId="formStreet">
					<Form.Label as={Col} sm={2} xs={12}>
						Street
					</Form.Label>
					<Col sm={10} xs={12}>
						<Form.Control type="text" placeholder="Enter street" required />
					</Col>
				</Form.Group>

				{/* City Field */}
				<Form.Group as={Row} className="mb-3" controlId="formCity">
					<Form.Label column sm={2} xs={12}>
						City
					</Form.Label>
					<Col sm={10} xs={12}>
						<Form.Control type="text" placeholder="Enter city" required />
					</Col>
				</Form.Group>

				{/* State Field */}
				<Form.Group as={Row} className="mb-3" controlId="formState">
					<Form.Label column sm={2} xs={12}>
						State
					</Form.Label>
					<Col sm={10} xs={12}>
						<Form.Control as="select" required>
							<option>Select your state</option>
							<option>California</option>
							<option>Texas</option>
							<option>New York</option>
							{/* Add other states as needed */}
						</Form.Control>
					</Col>
				</Form.Group>

				{/* Autodetect and Current Location Checkboxes */}
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
