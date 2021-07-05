import Link from 'next/link'

const Form = ({ isLogin, errorMessage, onSubmit , successMessage}) => (
	<form onSubmit={onSubmit}>
		{!isLogin && (
			<div className="mb-3">
				<label htmlFor="name" className="form-label">Name</label>
				<input type="text" className="form-control" id="name" name="name" aria-describedby="Name" required/>
			</div>
		)}
		{!isLogin && (
			<div className="mb-3">
				<label htmlFor="email" className="form-label">Last Name</label>
				<input type="text" className="form-control" id="lastName" name="lastName" aria-describedby="LastName" />
			</div>
		)}
		<div className="mb-3">
			<label htmlFor="email" className="form-label">Email address</label>
			<input type="email" className="form-control" id="email"  name="email" aria-describedby="emailHelp" required/>
		</div>
		<div className="mb-3">
			<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
			<input type="password" className="form-control" id="password" name="password" required/>
		</div>
		{!isLogin && (
			<div className="mb-3">
				<label htmlFor="exampleInputPassword1" className="form-label">Repeat password</label>
				<input type="password" className="form-control" id="passwordConfirm" name="passwordConfirm" required/>
			</div>
		)}

    <div className="submit">
      {isLogin ? (
        <>
          <Link href="/signup">
            <a>I don't have an account</a>
          </Link>
          <button type="submit">Login</button>
        </>
      ) : (
        <>
          <Link href="/login">
            <a>I already have an account</a>
          </Link>
          <button type="submit">Signup</button>
        </>
      )}
    </div>

    {errorMessage && <p className="error">{errorMessage}</p>}
    {successMessage && <p className="success">{successMessage}</p>}

    <style jsx>{`
      form,
      label {
        display: flex;
        flex-flow: column;
      }
      label > span {
        font-weight: 600;
      }
      input {
        padding: 8px;
        margin: 0.3rem 0 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .submit {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        justify-content: space-between;
      }
      .submit > a {
        text-decoration: none;
      }
      .submit > button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .submit > button:hover {
        border-color: #888;
      }
      .error {
        color: brown;
        margin: 1rem 0 0;
      }
    `}</style>
  </form>
)

export default Form
