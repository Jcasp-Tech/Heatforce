import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export interface faqSectionProps {
  isPage: boolean;
}

const FaqSection = (props: faqSectionProps) => {
  const { isPage } = props;

  return (
    <div>
      {!isPage && (
        <div className="mb-60">
          <div className="bgSky bgWhiteMob ridues padding24 paddingNoneMob">
            <div className="font32 fontMed mb-3 d-none d-xl-block">
              What else is included...
            </div>
            <div className="mb-2 fontHead60Mob d-block d-xl-none">
              What else is in your package?
            </div>
            <div className="row g-3">
              <div className="col-12 col-xl-6 order-0 order-xl-0">
                <div className="bgGray">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <Image
                        quality={100}
                        src="/images/pages/result/mcsLogoMed.png"
                        className="packageImg"
                        height={75}
                        width={75}
                        alt="packImg"
                      />
                    </div>
                    <div className="col">
                      <div className="font20Black">Full MCS installation</div>
                      <div className="font18Gray">
                        Inc. all required paperwork
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-6 d-none d-xl-block order-xl-1">
                <div className="bgGray">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <Image
                        quality={100}
                        src="/images/pages/result/premiumIcon.png"
                        className="packageImg"
                        height={75}
                        width={75}
                        alt="packImg"
                      />
                    </div>
                    <div className="col">
                      <div className="font20Black">Premium on-roof works</div>
                      <div className="font18Gray">
                        Inc. rail system, hooks & clamps
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-6 order-1 order-xl-2">
                <div className="bgGray">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <Image
                        quality={100}
                        src="/images/pages/result/hiesLogo.png"
                        className="packageImg"
                        height={75}
                        width={75}
                        alt="packImg"
                      />
                    </div>
                    <div className="col">
                      <div className="font20Black">HIES protection</div>
                      <div className="font18Gray">
                        2 year deposit protection
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-6 order-3 order-xl-3">
                <div className="bgGray">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <Image
                        quality={100}
                        src="/images/pages/result/dnoIcon.png"
                        className="packageImg"
                        height={75}
                        width={75}
                        alt="packImg"
                      />
                    </div>
                    <div className="col">
                      <div className="font20Black">
                        DNO (grid supplier) application
                      </div>
                      <div className="font18Gray">
                        Inc. all required paperwork
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fontHead60Mob d-block d-xl-none order-4">
                To be reviewed....
              </div>
              <div className="col-12 col-xl-6 order-5 order-xl-4">
                <div className="bgGray">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <Image
                        quality={100}
                        src="/images/pages/result/scaffoldingIcon.png"
                        className="packageImg"
                        height={75}
                        width={75}
                        alt="packImg"
                      />
                    </div>
                    <div className="col">
                      <div className="font20Black">Scaffolding</div>
                      <div className="font18Gray">
                        Once we&apos;ve finalised your design
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-6 order-2 order-xl-5">
                <div className="bgGray">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <Image
                        quality={100}
                        src="/images/pages/result/installationIcon.png"
                        className="packageImg"
                        height={75}
                        width={75}
                        alt="packImg"
                      />
                    </div>
                    <div className="col">
                      <div className="font20Black">Electrical installation</div>
                      <div className="font18Gray">
                        Inc. all required cables and fittings
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-60">
        <div className="bgSky ridues padding24 faqMob">
          <div className="col-12 col-lg-11 mx-auto">
            <div className="font40Black text-center mb-2 font44Mob">
              Frequently Asked Questions
            </div>
            <div className="borderBotmLight w-100 mb-2"></div>
            <div className="accordionCustom">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      How long will my solar panel installation take?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      The time it takes to install solar panels depends on the
                      size of your system and whether you include battery
                      storage. A standard installation without batteries usually
                      takes one day, while adding batteries extends it to one or
                      two days.
                    </div>
                  </div>
                  <div className="borderBotmLight"></div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      {`Who'll`} be installing my panels if I go ahead?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      With Consumer Energy Solutions, you get a seamless solar
                      experience. We handle everything – administration,
                      installation, and exceptional aftercare support. Our
                      skilled, insured, and rigorously vetted installers
                      prioritise your home and guide you through the entire
                      solar process.
                    </div>
                  </div>
                  <div className="borderBotmLight"></div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Do solar panels only work on sunny days?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Forget that myth! Solar panels absolutely work in low
                      light. Our AC system gives you a major advantage - your
                      panels generate energy for longer periods, even when the
                      sun isn&apos;t blazing. Standard DC systems sometimes
                      struggle in these conditions because their inverters have
                      higher startup energy needs.
                    </div>
                  </div>
                  <div className="borderBotmLight"></div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      When getting solar panels installed by CES, am I
                      protected?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Yes - in more ways than one.
                      <br />
                      <br />
                      The installation itself with come with a 2 year,
                      insurance-backed warranty by HIES. In the event of an
                      issue, simply get in touch with us, and it&apos;ll be
                      rectified. Plus, your deposit will also be protected.
                      <br />
                      <br />
                      What&apos;s more, our exclusive Das Solar panels come with
                      a 30 year warranty and our GivEnergy&apos;s warranties
                      cover the quality and latent defects of their products.
                      The warranty also includes the option to repair, replace,
                      or refund defective products.
                    </div>
                  </div>
                  <div className="borderBotmLight"></div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Can I still claim the feed-in-tariff (FIT) with solar?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      The feed-in-tariff has ended, but a similar program called
                      the Smart Export Guarantee (SEG) is now in place. With
                      SEG, you&apos;ll receive payments for surplus solar energy
                      you sell back to the grid.
                      <br />
                      When also pairing your solar system with our GivEnergy
                      Battery, you can maximise your export earnings with
                      Octopus Energy&apos;s Intelligent Flux Tariff
                    </div>
                  </div>
                  <div className="borderBotmLight"></div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSix"
                      aria-expanded="false"
                      aria-controls="collapseSix"
                    >
                      How much could solar reduce my bills by?
                    </button>
                  </h2>
                  <div
                    id="collapseSix"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {/* How much you save with solar depends on your energy use, your roof size, and if you add battery storage. In the right setup, solar can completely offset your energy costs. Plus, you have the option to store excess solar energy or sell it back to the grid. */}
                      <b>Curious to see how much you could save? </b>
                      Click [
                      <Link
                        style={{
                          textDecoration: 'none',
                          color: 'black',
                          fontWeight: '800',
                        }}
                        href="/survey"
                      >
                        <span>here</span>
                      </Link>
                      ] now to get a personalised estimate and start your
                      journey to lower energy bills!
                    </div>
                  </div>
                  <div className="borderBotmLight"></div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseEight"
                      aria-expanded="false"
                      aria-controls="collapseEight"
                    >
                      Do you need planning permission for solar panels?
                    </button>
                  </h2>
                  <div
                    id="collapseEight"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Good news! In most cases, you can install solar panels
                      without needing planning permission. The exception is if
                      you live in a listed building or a conservation area –
                      then you&apos;ll need to check with your council.
                    </div>
                  </div>
                  <div className="borderBotmLight"></div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseNine"
                      aria-expanded="false"
                      aria-controls="collapseNine"
                    >
                      What&apos;s the process of quoting and finalising my
                      system?
                    </button>
                  </h2>
                  <div
                    id="collapseNine"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      First, you&apos;ll get a quote online using our mapping
                      tool.
                      <br />
                      <br />
                      This will tell you how many panels can fit on your roof,
                      and show you some estimated savings and also how much you
                      can make.
                      <br />
                      <br />
                      Then, if wish to enquire further, we&apos;ll complete a
                      full MCS design of your system, showing panel placements
                      and nailing down your savings.
                    </div>
                  </div>
                  <div className="borderBotmLight"></div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTen"
                      aria-expanded="false"
                      aria-controls="collapseTen"
                    >
                      Are scaffolding costs included in my online quote?
                    </button>
                  </h2>
                  <div
                    id="collapseTen"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      No, scaffolding costs are not included in the online
                      quote.
                      <br />
                      <br />
                      If you wish to enquire further about a package, we&apos;ll
                      confirm the access requirements and finalise the price
                      including the type of scaffolding which you need.
                      <br />
                      <br />
                      Scaffolding typically costs around £500-£750.
                    </div>
                  </div>
                  <div className="borderBotmLight"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
