const Header = ({ user }) => {
    return (
        <div>
            {user ? (
                <div>
                    <h2>blogs</h2>
                    <p>
                        {user.name} logged in
                        <br />
                        <br />
                        <button
                            onClick={() => {
                                window.localStorage.removeItem(
                                    'loggedBlogappUser'
                                )
                                window.location.reload()
                            }}
                        >
                            log out
                        </button>
                    </p>
                </div>
            ) : null}
        </div>
    )
}

export default Header
