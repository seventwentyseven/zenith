// Standalone React 17.0.2
// Compiled with Babel 6.26.0
function modeicon(mode) {
    switch (mode) {
        case "std":
        case 0:
        case 4:
        case 8:
            return "std";
        case 1:
        case 5:
        case 8:
        case "taiko":
            return "taiko";
        case 2:
        case 6:
        case 9:
        case "ctb":
            return "ctb";
        case 3:
        case 7:
        case 12:
        case "mania":
            return "mania";
        default:
            return "std";
    }
}

const App = () => {
    const [data, setData] = React.useState({});
    React.useEffect(() => {
        fetch("/webapi/home/")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    if (Object.keys(data).length === 0) {
        return null;
    }
    console.log(data);

    const Articles = () => {
        return data.articles.map((article) => {
            return (
                <div
                    className="bg-hsl-20 rounded-lg w-full h-auto flex flex-col mb-4"
                    key={article.id}>
                    <a
                        className="flex items-center pt-3 px-3"
                        href={"/u/" + article.author}>
                        <img
                            src={
                                "https://a.seventwentyseven.xyz/" +
                                article.author
                            }
                            className="h-12 w-12 rounded-full mr-3"></img>
                        <div className="flex flex-col text-gray-300">
                            <p>
                                by
                                <span
                                    className="text-hsl-90 font-medium hover:text-hsl-80 transition duration-200 user_hoverable ml-3px"
                                    card_data-uid={article.author}
                                    card_data-pos="bottom">
                                    {article.author_name}
                                </span>
                            </p>
                            <p>
                                {timeago.format(new Date(article.date_posted))}
                            </p>
                        </div>
                        <div className="ml-auto flex text-lg text-hsl-90">
                            <h2 className="text-lg">Put something here</h2>
                        </div>
                    </a>
                    <a
                        href={"/article/" + article.id}
                        className="flex flex-col">
                        <img className="my-4" src={article.thumb_img}></img>
                        <h1 className="text-2xl font-semibold mb-3 mx-4">
                            {article.title}
                        </h1>
                        <p className="text-gray-300 mb-4 mx-4">
                            {article.content}
                            <br />
                            <span className="text-hsl-90 hover:text-hsl-80 transition duration-200">
                                Read More...
                            </span>
                        </p>
                    </a>
                </div>
            );
        });
    };

    const RecentlyRanked = () => {
        let maps = data.recent_ranked;
        let maps_arr = [];
        maps.forEach((map) => {
            // Create style map for background
            let style = {
                background:
                    "linear-gradient(hsla(var(--main), 15%, 15%, 0.75)," +
                    " hsla(var(--main), 15%, 15%, 0.75)), url('https://assets.ppy.sh/beatmaps/" +
                    map.setid +
                    "/covers/cover.jpg') no-repeat center center / cover",
            };
            maps_arr.push(
                <div
                    class="w-full bg-hsl-25 h-24 rounded-lg my-2 flex items-center"
                    style={style}>
                    <div class="p-3 flex flex-col my-2">
                        <a
                            href={"/s/" + map.setid}
                            class="transform duration-200">
                            <p>
                                <i
                                    class={
                                        "mr-3px mode-icon " + modeicon(map.mode)
                                    }></i>
                                {map.artist} - {map.title}
                            </p>
                            <p class="text-sm mt-1 text-gray-300">
                                Ranked by
                                <a href={"/u/" + map.userid} class="ml-3px">
                                    <span
                                        class="text-hsl-90 hover:text-hsl-80 transition duration-200 user_hoverable"
                                        card_data-uid={map.userid}
                                        card_data-pos="bottom">
                                        {map.name}
                                    </span>
                                </a>
                                <span class="text-sm text-white ml-3px">
                                    {timeago.format(map.date * 1000)}
                                </span>
                            </p>
                        </a>
                    </div>
                </div>
            );
        });
        return maps_arr;
    };

    const MostPlayed = () => {
        let maps = data.most_played_24h;
        let maps_arr = [];
        maps.forEach((map) => {
            // Create style map for background
            let style = {
                background:
                    "linear-gradient(hsla(var(--main), 15%, 15%, 0.75)," +
                    " hsla(var(--main), 15%, 15%, 0.75)), url('https://assets.ppy.sh/beatmaps/" +
                    map.id +
                    "/covers/cover.jpg') no-repeat center center / cover",
            };
            maps_arr.push(
                <div
                    class="w-full bg-hsl-20 h-24 rounded-lg my-2 flex items-center"
                    style={style}>
                    <a class="p-3 flex flex-col" href={"/b/" + map.id}>
                        <p class="mt-1">
                            <i
                                class={
                                    "mode-icon" + modeicon(map.mode) + "mr-0.5"
                                }></i>
                            {map.artist} - {map.title} [{map.version}]
                        </p>
                        <span class="text-hsl-90 text-sm mt-1">
                            Played {map.plays} times
                        </span>
                    </a>
                </div>
            );
        });

        return maps_arr;
    };

    const LastUser = () => {
        let style = {
            background:
                "linear-gradient(hsla(var(--main), 15%, 15%, 0.75)," +
                " hsla(var(--main), 15%, 15%, 0.75)), url('https://i.imgur.com/TBHkkIP.jpg') no-repeat center center / cover",
        };
        return (
            <div class="w-full bg-hsl-20 h-auto rounded-lg mb-4" style={style}>
                <div class="p-3 flex flex-col">
                    <span class="text-lg font-medium text-hsl-90">
                        <i class="fas fa-user mr-2"></i>Last Registered
                    </span>
                    <a
                        class="flex flex-row mt-2 items-center"
                        href={"/u/" + data.last_user.id}>
                        <img
                            src={
                                "https://a.seventwentyseven.xyz/" +
                                data.last_user.id
                            }
                            class="h-11 w-11 rounded"></img>
                        <div class="flex flex-col ml-4">
                            <span
                                class="text-hsl-90 font-medium hover:text-hsl-80 transition duration-200 user_hoverable"
                                card_data-uid={data.last_user.id}
                                card_data-pos="bottom">
                                {data.last_user.name}
                            </span>
                            <p class="text-hsl-90 font-medium">
                                <span>Registered</span>
                                <span class="ml-3px">
                                    {timeago.format(
                                        data.last_user.creation_time * 1000
                                    )}
                                </span>
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        );
    };

    return (
        <div class="mt-4 flex flex-col lg:flex-row h-fit">
            <div
                class="w-full lg:w-7/12 xl:w-8/12 h-full flex flex-col"
                id="articles">
                <Articles />
            </div>

            <div
                class="w-full lg:w-5/12 xl:w-4/12 h-full lg:ml-4"
                id="right-side">
                {/* <div class="w-full bg-hsl-20 h-28 rounded-lg mb-4">
                    <div class="flex flex-col h-full">
                        <span class="text-lg font-medium text-hsl-90 pt-3 px-3">
                            <i class="fas fa-users mr-2"></i>Online Users
                        </span>
                        <div
                            class="w-full h-auto mt-auto rounded-b-lg mb-px"
                            id="chart-users-online"></div>
                    </div>
                </div> */}
                <LastUser />
                <div
                    class="w-full bg-hsl-20 rounded-lg p-4 mb-4"
                    id="most-played">
                    <span class="text-lg font-medium text-hsl-90">
                        <i class="fas fa-trophy mr-2"></i>Most Played Today
                    </span>
                    <MostPlayed />
                </div>
                <div class="w-full bg-hsl-20 rounded-lg p-4" id="recent-ranked">
                    <span class="text-lg font-medium text-hsl-90">
                        <i class="fas fa-trophy mr-2"></i>Recently Ranked
                    </span>
                    <RecentlyRanked />
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
