//? NextJS and React imports
import Head from 'next/head'
import Image from 'next/image'

//? Flowbite imports
import Layout from '../../components/Layout'

//? Our components

const DonatePage = () => {
  return (
    <Layout>
      <Head>
        <title>{`Support Us!`}</title>
      </Head>
      <div
        className="min-h-screen w-full top-0 bg-hsl-15 bg-cover bg-no-repeat -z-50 fixed"
        style={{
          backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, 0.4), hsla(230, 15%, 15%, 0.4)), url("https://seventwentyseven.xyz/backgrounds/3")`,
          backgroundSize: 'cover'
        }}
      ></div>

      <div className="w-full">
        <div className="w-full h-screen bg-hsl-10 rounded-t-xl bg-opacity-30 flex items-center">
          <div className="w-full px-24 flex flex-col mt-16">
            <h1 className="text-4xl font-bold text-white font-nunito">
              Donate and help us grow!
            </h1>
            <span className="text-xl text-white mt-2 font-comfortaa max-w-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ipsa
              cumque et eaque labore
            </span>
            <button className="bg-hsl-50 rounded-full w-min px-12 py-2 whitespace-nowrap mt-8 hover:bg-hsl-60 hover:scale-105 transition duration-200">
              Support Us!
            </button>
          </div>
        </div>
        <div className="w-full bg-hsl-10 backdrop-blur-xl bg-opacity-60">
          <div className="px-12 flex flex-col justify-center">
            <h2 className="text-3xl mx-auto my-7">What will I get?</h2>
          </div>
          <div className="mx-8 lg:mx-20 grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* 1 */}
            <figure className="rounded-2xl h-52 group">
              <div
                className="w-full h-full rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-200"
                style={{
                  backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, 0.5), hsla(230, 15%, 15%, 0.5)), url("https://assets.dzifors.tk/donor/screen1.png")`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
              />
              <div className="w-full h-full z-10 -translate-y-[100%] flex flex-col p-4">
                <div className="flex flex-row items-center mb-2">
                  <figure className="h-10 w-10 text-lg rounded-lg font-bold font-nunito bg-hsl-50 group-hover:bg-hsl-25 group-hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
                    1
                  </figure>
                  <h4 className="text-lg -mb-1 ml-3">
                    Profile Banner & Background
                  </h4>
                </div>
                <p>
                  With supporter tag, you can choose a custom banner,
                  background, and color scheme for your profile. This will give
                  your profile a unique and personalized touch, making it truly
                  yours!
                </p>
              </div>
            </figure>
            {/* 2 */}
            <figure className="rounded-2xl h-52 group">
              <div
                className="w-full h-full rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-200"
                style={{
                  backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, 0.4), hsla(230, 15%, 15%, 0.4)), url("https://seventwentyseven.xyz/backgrounds/26")`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <div className="w-full h-full z-10 -translate-y-[100%] flex flex-col p-4">
                <div className="flex flex-row items-center mb-2">
                  <figure className="h-10 w-10 text-lg rounded-lg font-bold font-nunito bg-hsl-50 group-hover:bg-hsl-25 group-hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
                    2
                  </figure>
                  <h4 className="text-lg -mb-1 ml-3">User Card Theme</h4>
                </div>
                <p>
                  Like with Nitro on Discord, now you&apos;ll have ability to{' '}
                  <s>permanently blind people</s> change the colors of your user
                  card! This includes theme, and gradient colors!
                </p>
              </div>
            </figure>
            {/* 3 */}
            <figure className="rounded-2xl h-52 group">
              <div
                className="w-full h-full rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-200"
                style={{
                  backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, 0.4), hsla(230, 15%, 15%, 0.4)), url("https://seventwentyseven.xyz/backgrounds/26")`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <div className="w-full h-full z-10 -translate-y-[100%] flex flex-col p-4">
                <div className="flex flex-row items-center mb-2">
                  <figure className="h-10 w-10 text-lg rounded-lg font-bold font-nunito bg-hsl-50 group-hover:bg-hsl-25 group-hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
                    3
                  </figure>
                  <h4 className="text-lg -mb-1 ml-3">Graveyard Rankings</h4>
                </div>
                <p>
                  With supporter tag, you can view and compete on leaderboards
                  for any map, even if it&apos;s unranked. While these scores
                  won&apos;t count towards global rankings, you can still enjoy
                  the competition and challenge yourself against other players.
                </p>
              </div>
            </figure>
            {/* 4 */}
            <figure className="rounded-2xl h-52 group">
              <div
                className="w-full h-full rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-200"
                style={{
                  backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, 0.4), hsla(230, 15%, 15%, 0.4)), url("https://seventwentyseven.xyz/backgrounds/26")`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <div className="w-full h-full z-10 -translate-y-[100%] flex flex-col p-4">
                <div className="flex flex-row items-center mb-2">
                  <figure className="h-10 w-10 text-lg rounded-lg font-bold font-nunito bg-hsl-50 group-hover:bg-hsl-25 group-hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
                    4
                  </figure>
                  <h4 className="text-lg -mb-1 ml-3">Closed Polls</h4>
                </div>
                <p>
                  On our discord server, we have a channel dedicated to voting
                  for new features, designs and more. With supporter tag,
                  you&apos;ll be able to vote on these polls!
                </p>
              </div>
            </figure>
            {/* 5 */}
            <figure className="rounded-2xl h-52 group">
              <div
                className="w-full h-full rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-200"
                style={{
                  backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, 0.4), hsla(230, 15%, 15%, 0.4)), url("https://seventwentyseven.xyz/backgrounds/26")`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <div className="w-full h-full z-10 -translate-y-[100%] flex flex-col p-4">
                <div className="flex flex-row items-center mb-2">
                  <figure className="h-10 w-10 text-lg rounded-lg font-bold font-nunito bg-hsl-50 group-hover:bg-hsl-25 group-hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
                    5
                  </figure>
                  <h4 className="text-lg -mb-1 ml-3">Leaderboard by pp</h4>
                </div>
                <p>
                  By using the Auto mod in our leaderboard feature, you can
                  easily sort scores by pp. This will allow you to quickly view
                  and compare scores, making it easier to track your progress
                  and stay motivated to improve!
                </p>
              </div>
            </figure>
            {/* 6 */}
            <figure className="rounded-2xl h-52 group">
              <div
                className="w-full h-full rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-200"
                style={{
                  backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, 0.4), hsla(230, 15%, 15%, 0.4)), url("https://seventwentyseven.xyz/backgrounds/26")`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <div className="w-full h-full z-10 -translate-y-[100%] flex flex-col p-4">
                <div className="flex flex-row items-center mb-2">
                  <figure className="h-10 w-10 text-lg rounded-lg font-bold font-nunito bg-hsl-50 group-hover:bg-hsl-25 group-hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
                    6
                  </figure>
                  <h4 className="text-lg -mb-1 ml-3">Score Details</h4>
                </div>
                <p>
                  On score page, you&apos;ll be able to view more details about
                  the score, such as the hit deviancy graph, the accuracy graph
                  and more. This will allow you to better understand what went
                  wrong and how to improve!
                </p>
              </div>
            </figure>
            {/* 7 */}
            <figure className="rounded-2xl h-52 group">
              <div
                className="w-full h-full rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-200"
                style={{
                  backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, 0.4), hsla(230, 15%, 15%, 0.4)), url("https://seventwentyseven.xyz/backgrounds/26")`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <div className="w-full h-full z-10 -translate-y-[100%] flex flex-col p-4">
                <div className="flex flex-row items-center mb-2">
                  <figure className="h-10 w-10 text-lg rounded-lg font-bold font-nunito bg-hsl-50 group-hover:bg-hsl-25 group-hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
                    7
                  </figure>
                  <h4 className="text-lg -mb-1 ml-3">Most played history</h4>
                </div>
                <p>
                  With supporter tag, you&apos;ll be able to view all your plays
                  on specific map with links to responsible scores. This will
                  allow you to easily compare your scores and see how
                  you&apos;ve improved!
                </p>
              </div>
            </figure>
            {/* 8 */}
            <figure className="rounded-2xl h-52 group">
              <div
                className="w-full h-full rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-200"
                style={{
                  backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, 0.4), hsla(230, 15%, 15%, 0.4)), url("https://seventwentyseven.xyz/backgrounds/26")`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <div className="w-full h-full z-10 -translate-y-[100%] flex flex-col p-4">
                <div className="flex flex-row items-center mb-2">
                  <figure className="h-10 w-10 text-lg rounded-lg font-bold font-nunito bg-hsl-50 group-hover:bg-hsl-25 group-hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
                    8
                  </figure>
                  <h4 className="text-lg -mb-1 ml-3">
                    Change nickname and profile wipe
                  </h4>
                </div>
                <p>
                  Once a month, you&apos;ll have ability to change your nickname
                  and wipe your profile!
                </p>
              </div>
            </figure>
            {/* 9 */}
            <figure className="rounded-2xl h-52 group">
              <div
                className="w-full h-full rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-200"
                style={{
                  backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, 0.4), hsla(230, 15%, 15%, 0.4)), url("https://seventwentyseven.xyz/backgrounds/26")`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <div className="w-full h-full z-10 -translate-y-[100%] flex flex-col p-4">
                <div className="flex flex-row items-center mb-2">
                  <figure className="h-10 w-10 text-lg rounded-lg font-bold font-nunito bg-hsl-50 group-hover:bg-hsl-25 group-hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
                    9
                  </figure>
                  <h4 className="text-lg -mb-1 ml-3">Badge on profile</h4>
                </div>
                <p>
                  With supporter you&apos;ll get profile badge that not only
                  displays your support for our server, but also upgrades over
                  time as you continue to support us!
                </p>
              </div>
            </figure>
            {/* 10 */}
            <figure className="rounded-2xl h-52 group">
              <div
                className="w-full h-full rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-200"
                style={{
                  backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, 0.4), hsla(230, 15%, 15%, 0.4)), url("https://seventwentyseven.xyz/backgrounds/26")`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <div className="w-full h-full z-10 -translate-y-[100%] flex flex-col p-4">
                <div className="flex flex-row items-center mb-2">
                  <figure className="h-10 w-10 text-lg rounded-lg font-bold font-nunito bg-hsl-50 group-hover:bg-hsl-25 group-hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
                    10
                  </figure>
                  <h4 className="text-lg -mb-1 ml-3">Gif avatars</h4>
                </div>
                <p>
                  With supporter tag, you can use animated avatars to express
                  yourself on the website. Everyone will see your animated anime
                  waifu blushing, giving your profile a personalized touch.
                </p>
              </div>
            </figure>
            {/* 11 */}
            <figure className="rounded-2xl h-52 group">
              <div
                className="w-full h-full rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-200"
                style={{
                  backgroundImage: `linear-gradient(180deg, hsla(230, 15%, 15%, 0.4), hsla(230, 15%, 15%, 0.4)), url("https://seventwentyseven.xyz/backgrounds/26")`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <div className="w-full h-full z-10 -translate-y-[100%] flex flex-col p-4">
                <div className="flex flex-row items-center mb-2">
                  <figure className="h-10 w-10 text-lg rounded-lg font-bold font-nunito bg-hsl-50 group-hover:bg-hsl-25 group-hover:bg-opacity-80 transition duration-300 flex items-center justify-center">
                    11
                  </figure>
                  <h4 className="text-lg -mb-1 ml-3">Golden Name</h4>
                </div>
                <p>
                  With supporter tag, your in game nickname will have golden
                  color to stand out from the crowd!
                </p>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DonatePage
