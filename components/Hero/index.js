const styles = {
  wrapper: 'flex w-full items-center justify-center pt-16 lg:pt-20 xl:pr-20',
  container: '',
  heroTitle: 'uppercase font-mono text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-purple-600',
  heroParagraph: ' font-mono text-indigo-200 mb-10',
  heroCta: 'font-mono flex items-center space-x-10',
  mintButton:
    'rounded-xl border border-gray-100 bg-transparent px-8 py-4 font-semibold text-gray-100 transition-all hover:bg-gray-100 hover:text-[#1d1d1d]',
}


const Hero = () => {

  return (
    <>
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className="inline-flex">
        <h1 className={`${styles.heroTitle}`}>Solana Animeta</h1>
        <span className="flex items-end pb-1.5 ml-5 text-lg text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-purple-300 font-semibold justify-center">ソラナ・アニメータ</span>
        </div>
        
        <p className={`italic ${styles.heroParagraph} my-10`}>
          This is NOT a real ANM NFT drop , it is a clone made for learning purposes!
        </p>
        <p className={styles.heroParagraph}>
          Animeta Solana is a clone of the popular NFT Collection <span className='italic'>Animeta</span> which resides on the ethereum blockchain. The Clone was created by Dipen Kalsi as a personal project for learning purposes and fun. This Collection of NFTs resides on the Solana Devnet.
        </p>
        <p className="uppercase font-mono text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-green-300 to-purple-600 mb-3">Description</p>
        <p className='font-mono text-indigo-200 mb-3'>Solana Animeta(ANM) is a group of guys and girls from the year 2077. They have lost the track of time and have reached at your doorstep. Would you house them?</p>
        <p className='font-mono text-indigo-200 mb-3'>Each of these fellas come with there own unique properties and traits which makes them all unique. The collection uses <span className='italic font-semibold'>Solana Candy Machine</span> for deploying these baddies to the solana devnet.</p>
        <p className='font-mono text-indigo-200 mb-10'>Solana Candy Machine is an amazing feature provided by <span className='italic font-semibold'>Metaplex</span>, which is a third party service aimed on helping people develop and deploy NFT projects on Solana. They provide various other features which are greatly helpful for people from both programming and non-programming backgrounds.</p>
        <div className={styles.heroCta}>
        </div>
      </div>
    </main>
    
    </>
  )
}

export default Hero
