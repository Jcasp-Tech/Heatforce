import { Collapse } from 'antd';

import accordinaArrow from '@/public/faq/accordinan_arrow.webp';

import styled from './helpInfo.module.scss';
import Image from 'next/image';

const { Panel } = Collapse;
const AccordionArrow = ({ isActive, src }: any) => (
  <Image
  height={160}
  width={160}
    src={src}
    style={{
      width: '20px',
      transform: `${isActive ? 'rotate(180deg)' : 'rotate(0deg)'}`,
      transitionDuration: '400ms',
    }}
    alt="arrow"
  />
);

const HelpAndInfo = () => {
  const items: any = [
    {
      key: '1',
      label: 'How long will my solar panel installation take?',
      children:
        'The time it takes to install solar panels depends on the size of your system and whether you include battery storage. A standard installation without batteries usually takes one day, while adding batteries extends it to one or two days.',
    },
    {
      key: '2',
      label: "Who'll be installing my panels if I go ahead?",
      children:
        'With Consumer Energy Solutions, you get a seamless solar experience. We handle everything – administration, installation, and exceptional aftercare support. Our skilled, insured, and rigorously vetted installers prioritise your home and guide you through the entire solar process.',
    },
    {
      key: '3',
      label: 'When getting solar panels installed by CES, am I protected?',
      children:
        "Yes - in more ways than one.\nThe installation itself with come with a 2 year, insurance-backed warranty by HIES. In the event of an issue, simply get in touch with us, and it'll be rectified. Plus, your deposit will also be protected.<br/><br/>What's more, our exclusive SolarX solar panels come with a 25 year warranty which is insurance-backed by Munich RE. They'll warranty the product itself for that period, and also the performance levels too.",
    },
    {
      key: '4',
      label: 'Can I still claim the feed-in-tariff (FIT) with solar?',
      children:
        "The feed-in-tariff has ended, but a similar program called the Smart Export Guarantee (SEG) is now in place.  With SEG, you'll receive payments for surplus solar energy you sell back to the grid.",
    },
    {
      key: '5',
      label: 'Do solar panels only work on sunny days?',
      children:
        "Forget that myth! Solar panels absolutely work in low light. Our AC system gives you a major advantage - your panels generate energy for longer periods, even when the sun isn't blazing. Standard DC systems sometimes struggle in these conditions because their inverters have higher startup energy needs.",
    },
    {
      key: '6',
      label: 'How much could solar reduce my bills by?',
      children:
        'How much you save with solar depends on your energy use, your roof size, and if you add battery storage. In the right setup, solar can completely offset your energy costs. Plus, you have the option to store excess solar energy or sell it back to the grid.',
    },
    {
      key: '7',
      label: 'Do you need planning permission for solar panels?',
      children:
        "Good news! In most cases, you can install solar panels without needing planning permission. The exception is if you live in a listed building or a conservation area – then you'll need to check with your council.",
    },
    {
      key: '8',
      label: "What's the process of quoting and finalising my system?",
      children:
        "First, you'll get a quote online using our mapping tool.<br/><br/>This will tell you how many panels can fit on your roof, and show you some estimated savings and also how much you can make.<br/><br/>Then, if wish to enquire further, we'll complete a full MCS design of your system, showing panel placements and nailing down your savings.",
    },
    {
      key: '9',
      label: 'Are scaffolding costs included in my online quote?',
      children:
        "No, scaffolding costs are not included in the online quote.If you wish to enquire further about a package, we'll confirm the access requirements and finalise the price including the type of scaffolding which you need. <br/><br/>Scaffolding typically costs around £500-£750.",
    },
  ];

  return (
    <div className={`${styled.helpInfo} display-desktop`}>
      <div className="container" style={{ marginTop: '50px' }}>
        <div>
          <p
            style={{
              width: '100%',
              color: 'black',
              padding: '1%',
              margin: 'none',
              fontSize: '3rem',
            }}
          >
            Help & info
          </p>
        </div>
        {items && (
          <Collapse
            expandIconPosition="right"
            expandIcon={(a: any) => (
              <AccordionArrow isActive={a.isActive} src={accordinaArrow.src} />
            )}
            accordion
          >
            {items &&
              items.map((i: any) => {
                return (
                  <Panel
                    forceRender
                    header={i.label}
                    style={{ fontSize: '20px' }}
                    key={i.key}
                  >
                    <p
                      style={{
                        overflowWrap: 'break-word',
                        maxWidth: '95%',
                        fontSize: '15px',
                        color: '#0F3B59',
                      }}
                      dangerouslySetInnerHTML={{ __html: i.children }}
                    />
                  </Panel>
                );
              })}
          </Collapse>
        )}
      </div>
    </div>
  );
};

export default HelpAndInfo;
