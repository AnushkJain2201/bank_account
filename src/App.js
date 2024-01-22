import { useReducer } from "react";

const initialStates = {
	status: "closed",
	balance: 0,
	loan: 0,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "openAccount":
			return {
				...state,
				status: "opened",
				balance: 500,
			};

		case "deposit":
			return {
				...state,
				balance: state.balance + 150,
			};

		case "withdraw":
			if (state.balance > 0) {
				return {
					...state,
					balance: state.balance - 50,
				};
			} else {
				return {
					...state,
					balance: 0,
				};
			}

		case "getLoan":
			if (state.loan !== 5000) {
				return {
					...state,
					loan: 5000,
					balance: state.balance + 5000,
				};
			} else {
				return {
					...state,
				};
			}

		case "payLoan":
			if (state.balance >= 5000) {
				return {
					...state,
					balance: state.balance - 5000,
					loan: 0,
				};
			} else {
				return {
					...state
				}
			}
		
		case "closeAccount":
			return {
				...state,
				status: "closed",
				balance: 0,
				loan: 0
			}

		default:
			throw new Error("Action Unknown");
	}
};

function App() {
	const [{ status, balance, loan }, dispatch] = useReducer(
		reducer,
		initialStates
	);

	let flag = status === "closed" ? false : true;

	return (
		<div className='app'>
			<h1>useReducer Bank Account</h1>
			<p>Balance: {balance}</p>
			<p>Loan: {loan}</p>

			<p>
				<button
					disabled={flag}
					onClick={() => dispatch({ type: "openAccount" })}
				>
					Open Account
				</button>
			</p>

			<p>
				<button
					disabled={!flag}
					onClick={() => dispatch({ type: "deposit" })}
				>
					Deposit 150
				</button>
			</p>

			<p>
				<button
					disabled={!flag}
					onClick={() => dispatch({ type: "withdraw" })}
				>
					Withdraw 50
				</button>
			</p>

			<p>
				<button
					disabled={!flag}
					onClick={() => dispatch({ type: "getLoan" })}
				>
					Request A Loan Of 5000
				</button>
			</p>

			<p>
				<button
					disabled={!flag}
					onClick={() => dispatch({ type: "payLoan" })}
				>
					Pay Loan
				</button>
			</p>

			<p>
				<button disabled={!flag} onClick={() => {
					dispatch({type: "closeAccount"})
				}} >Close Account</button>
			</p>
		</div>
	);
}

export default App;
