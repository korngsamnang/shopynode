const SearchBox = () => {
    const submitHandler = e => {
        e.preventDefault();
    };

    return (
        <form onSubmit={submitHandler} className="flex">
            <input
                type="text"
                name="q"
                placeholder="Search ProductList..."
                className="mr-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                defaultValue={""}
            />
            <button
                type="submit"
                className="bg-primary text-white p-2 rounded hover:bg-primary-dark"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBox;
