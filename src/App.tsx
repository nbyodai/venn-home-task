function App() {

  return (
    <form>
      <h1 className="text-3xl font-bold">Onboarding Form</h1>
      <div>
        <input type="text" name="firstName" id="firstName" />
        <label htmlFor="firstName">First Name</label>

        <input type="text" name="lastName" id="lastName" />
        <label htmlFor="lastName">Last Name</label>
      </div>

    </form>
  )
}

export default App
