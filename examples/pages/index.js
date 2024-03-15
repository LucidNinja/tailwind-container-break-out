import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tailwind Container Break Out Examples</title>
        <meta name="description" content="Tailwind Container Break Out Examples" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="my-20 container text-gray-700">
        <h1 className="text-2xl font-bold mb-8">Tailwind Container Break Out Examples</h1>
        <hr className="border-b border-gray-200 mb-12" />
        <h2 className="text-xl font-medium mb-4">Margin Break Outs</h2>
        <p className="mb-8">
          The <span className="text-blue font-mono">{`\`m{l|r|x}-break-out\``}</span> classes are used to break out of
          the parent container and stretch to the full width of the window. These classes are all available using
          Tailwind&apos;s responsive system.
        </p>
        <div className="rounded-xl bg-stripes bg-gradient-to-r from-blue-lightest to-blue-light bg-blue-light grid grid-cols-2 gap-4 text-white text-center font-medium text-xl pb-8 mb-8">
          <div className="col-span-2 bg-blue rounded-tr-lg rounded-tl-lg text-2xl p-4">Container</div>
          <div className="bg-blue/70 rounded-lg col-span-2 mx-break-out p-8">mx-break-out</div>
          <div className="bg-blue/70 rounded-lg p-8">No break out</div>
          <div className="bg-blue/70 rounded-lg p-8">No break out</div>
          <div className="bg-blue/70 rounded-lg ml-break-out p-8">ml-break-out</div>
          <div className="bg-blue/70 rounded-lg  mr-break-out p-8">mr-break-out</div>
          <div className="bg-blue/70 col-span-2 rounded-lg mx-break-out p-8">
            mx-break-out
            <p className="text-left text-sm mt-4">
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id
              nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vivamus
              sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Sed posuere consectetur est at lobortis.
            </p>
          </div>
        </div>

        <hr className="border-b border-gray-200 my-20" />
        <h2 className="text-xl font-medium mb-4">Padding Break Outs</h2>
        <p className="mb-8">
          The <span className="text-blue font-mono">{`\`p{l|r|x}-break-out\``}</span> classes are used to counteract the
          <span className="text-blue font-mono">{`\`m{l|r|x}-break-out\``}</span> margin classes in order to align the
          inner content to the parent container.
        </p>

        <div className="rounded-xl bg-stripes bg-gradient-to-r from-blue-lightest to-blue-light bg-blue-light grid grid-cols-2 gap-4 text-white text-center font-medium text-xl pb-8">
          <div className="col-span-2 bg-blue rounded-tr-lg rounded-tl-lg text-2xl p-4">Container</div>
          <div className="col-span-2 rounded-lg bg-blue/70 py-8 mx-break-out px-break-out">
            mx-break-out, px-break-out
            <p className="text-justify text-sm mt-4">
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id
              nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vivamus
              sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Sed posuere consectetur est at lobortis.
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id
              nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vivamus
              sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Sed posuere consectetur est at lobortis.
            </p>
          </div>
          <div className="rounded-lg bg-blue/70 py-8 ml-break-out pl-break-out pr-8">
            ml-break-out, pl-break-out
            <p className="text-left text-sm mt-4">
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id
              nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vivamus
              sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Sed posuere consectetur est at lobortis.
            </p>
          </div>
          <div className="rounded-lg bg-blue/70 py-8 mr-break-out pr-break-out pl-8">
            mr-break-out, pr-break-out
            <p className="text-right text-sm mt-4">
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id
              nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vivamus
              sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Sed posuere consectetur est at lobortis.
            </p>
          </div>
        </div>

        <hr className="border-b border-gray-200 my-20" />
        <h2 className="text-xl font-medium mb-4">Max-Width &amp; Dynamic Breakpoints</h2>
        <p className="mb-8">
          The <span className="text-blue font-mono">{`\`m{l|r|x}-break-out\``}</span> margin classes and{' '}
          <span className="text-blue font-mono">{`\`p{l|r|x}-break-out\``}</span> classes used with{' '}
          <span className="text-blue font-mono">max-*</span> &amp; <span className="text-blue font-mono">min-*</span>{' '}
          classes.
        </p>

        <div className="rounded-xl bg-stripes bg-gradient-to-r from-blue-lightest to-blue-light bg-blue-light grid grid-cols-2 gap-4 text-white text-center font-medium text-xl pb-8">
          <div className="col-span-2 bg-blue rounded-tr-lg rounded-tl-lg text-2xl p-4">Container</div>
          <div className="col-span-2 rounded-lg bg-blue/70 py-8 max-lg:mx-break-out max-lg:px-break-out">
            max-lg:mx-break-out, max-lg:px-break-out
            <p className="text-justify text-sm mt-4">
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id
              nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vivamus
              sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Sed posuere consectetur est at lobortis.
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id
              nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vivamus
              sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Sed posuere consectetur est at lobortis.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
