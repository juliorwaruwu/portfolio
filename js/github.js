const githubCard =
document.getElementById(
    "github-card"
);

fetch(
    "https://api.github.com/users/juliorwaruwu"
)

.then(response =>
    response.json()
)

.then(data => {

    githubCard.innerHTML = `

        <img
            src="${data.avatar_url}"
            alt="Github Avatar"
            class="github-avatar"
        >

        <h3>${data.name}</h3>

        <p>
            ${data.bio || ""}
        </p>

        <div class="github-stats">

            <div>
                <h4>
                    ${data.public_repos}
                </h4>
                <span>Repositories</span>
            </div>

            <div>
                <h4>
                    ${data.followers}
                </h4>
                <span>Followers</span>
            </div>

            <div>
                <h4>
                    ${data.following}
                </h4>
                <span>Following</span>
            </div>

        </div>

        <a
            href="${data.html_url}"
            target="_blank"
            class="primary-btn"
        >
            Visit Github
        </a>

    `;

})

.catch(error => {

    githubCard.innerHTML =

    `
    <h3>
        Unable to load Github profile.
    </h3>
    `;

    console.error(error);

});