import React, { useState } from "react"
import APIManager from "../../modules/APIManager"
import "./Login.css"

const Login = props => {
	const [credentials, setCredentials] = useState({ email: "", password: "" })
	const [newUser, setNewUser] = useState({ email: "", username: "", password: "", birthday: "", accountCreated: "" })
	const [isLoading, setIsLoading] = useState(false)

	// Update state whenever an input field is edited
	const handleFieldChange = (evt) => {
		const stateToChange = { ...credentials }
		stateToChange[evt.target.id] = evt.target.value
		setCredentials(stateToChange)
	}

	const handleLogin = (e) => {
		e.preventDefault()
		APIManager.getAllUsers()
			.then(users => users.find(user => {
				if (user.email === credentials.email && user.password === credentials.password) {
					props.setUser(user)
					props.history.push("/")
				}
			}))
	}

	// Update state whenever an input field is edited
	const handleFieldChange2 = (evt) => {
		const stateToChange = { ...newUser }
		stateToChange[evt.target.name] = evt.target.value
		setNewUser(stateToChange)
	}

	const confirmPassword = document.querySelector("#registerConfirmPassword")

	const testPassword = () => {
		if (confirmPassword.value !== document.querySelector("#registerPassword").value && confirmPassword.value !== "") {
			confirmPassword.setCustomValidity("Please make sure your passwords match.")
		} else {
			confirmPassword.setCustomValidity("")
		}
	}

	const handleRegister = (e) => {
		e.preventDefault()
		setIsLoading(true)
		confirmPassword.setCustomValidity("Please make sure your passwords match.")
		if (newUser.password !== confirmPassword.value) {
			confirmPassword.reportValidity()
		} else {
			newUser.accountCreated = new Date()
			APIManager.saveUser(newUser)
				.then(() => APIManager.getAllUsers()
					.then(users => users.find(user => {
						if (user.email === newUser.email && user.password === newUser.password) {
							const newEntryObj1 = {
								entry: `Happy birthday, ${user.username}!`,
								date: user.birthday,
								isSignificant: true,
								userId: user.id,
								categoryId: 1
							}
							const newEntryObj2 = {
								entry: "Joined IMHAPPY",
								date: user.accountCreated.substring(0, 10),
								isSignificant: false,
								userId: user.id,
								categoryId: 1
							}
							APIManager.saveEntry(newEntryObj1)
							APIManager.saveEntry(newEntryObj2)
						}
					}))
				)
				.then(() => props.history.push("/"))
		}
	}

	return (
		<div className="container-login-register">
			<div className="container-login">
				<span className="form-heading">Log in</span>
				<form onSubmit={handleLogin}>
					<fieldset>
						<label htmlFor="email">Email</label>
						<br />
						<input
							className="form"
							id="email"
							onChange={handleFieldChange}
							required
							type="email"
						/>
						<br />

						<label htmlFor="password">Password</label>
						<br />
						<input
							className="form"
							id="password"
							onChange={handleFieldChange}
							required
							type="password"
						/>
						<br />

						<button disabled={isLoading} type="submit">Log in</button>
					</fieldset>
				</form>
			</div>

			<div className="container-register">
				<span className="form-heading">Create a new account</span>
				<form onSubmit={handleRegister}>
					<fieldset>
						<label htmlFor="registerUsername">Username</label>
						<br />
						<input
							className="form"
							id="registerUsername"
							name="username"
							onChange={handleFieldChange2}
							required
							type="text"
						/>
						<br />

						<label htmlFor="registerEmail">Email</label>
						<br />
						<input
							className="form"
							id="registerEmail"
							name="email"
							onChange={handleFieldChange2}
							required
							type="email"
						/>
						<br />

						<label htmlFor="registerPassword">Password</label>
						<br />
						<input
							className="form"
							id="registerPassword"
							name="password"
							onChange={handleFieldChange2}
							required
							type="password"
						/>
						<br />

						<label htmlFor="registerConfirmPassword">Confirm password</label>
						<br />
						<input
							className="form"
							id="registerConfirmPassword"
							name="confirmPassword"
							onChange={testPassword}
							required
							type="password"
						/>
						<br />

						<label htmlFor="registerBirthday">Birthday</label>
						<br />
						<input
							className="form"
							id="registerBirthday"
							name="birthday"
							onChange={handleFieldChange2}
							required
							type="date"
						/>
						<br />

						<button disabled={isLoading} type="submit">Sign up</button>
					</fieldset>
				</form>
			</div>
		</div>
	)
}

export default Login