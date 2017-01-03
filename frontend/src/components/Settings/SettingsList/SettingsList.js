import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Link from 'components/Link';

import { logoutUser, isUserAdmin } from 'util/user';

import ChiThanh from 'res/about/ChiThanh.jpg';
import EugeneNg from 'res/about/EugeneNg.jpg';
import IrvinLim from 'res/about/IrvinLim.jpg';
import KaiYiLee from 'res/about/KaiYiLee.jpg';
import KiatHan from 'res/about/KiatHan.jpg';
import LeonMak from 'res/about/LeonMak.jpg';
import SueMae from 'res/about/SueMae.jpg';
import WangYanHao from 'res/about/WangYanHao.jpg';
import ZhangHanMing from 'res/about/ZhangHanMing.jpg';
import ExchangeBuddyIcon from 'res/ExchangeBuddySpreadIcon.png';

const AboutUsItem = ({ images, name, title, quote }) => (
  <div className={`single-profile col-xs-12 col-sm-${ images.length == 1 ? 6 : 12 }`}>
    <div className="crop row center-xs">
      { images.map((image, idx) => <img key={ idx } src={ image } style={{ margin: 5 }} />) }
    </div>
    <div className="row center-xs">
      <h1>{ name }</h1>
    </div>
    <div className="row center-xs">
      <h2>{ title }</h2>
    </div>
    <div className="row center-xs">
      <p>"{ quote }"</p>
    </div>
  </div>
);

AboutUsItem.propTypes = {
  images: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  name: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  quote: React.PropTypes.string.isRequired,
};

const About = () => (
  <div className="row start-xs">
    <Card className="settings-item-card col-xs">
      <CardHeader
        className="settings-title"
        title="About"
        actAsExpander
        showExpandableButton />

      <CardText expandable>
        <div className="settings-info">
          <h1>About</h1>
          <div className="icon row center-xs">
            <img src={ExchangeBuddyIcon} alt="icon" />
          </div>

          <p id="about-info">ExchangeBuddy is for students, by students. We are here to provide you with a better exchange experience by providing you with information and a network for you to interact and know other students on exchange! Believe at ExchangeBuddy, we know that exchange is a once in a lifetime experience and we want you to get the BEST out of it!</p>

          <h2>The Team</h2>
          <div className="row">
            <AboutUsItem images={[ EugeneNg ]} name="Eugene Ng" title="[Lead Guide]" quote="Dream big, do big, make it happen" />
            <AboutUsItem images={[ WangYanHao ]} name="Wang Yan Hao" title="[Full Stack Guru]" quote="I love to party, but coding needs me more" />
            <AboutUsItem images={[ KaiYiLee ]} name="Lee Kai Yi" title="[What you see is what I build]" quote="Throw me something to do, and that will be my life" />
            <AboutUsItem images={[ ZhangHanMing ]} name="Zhang Han Ming" title="[Backend magician]" quote="Logic doesn't create wonders, magic does" />
            <AboutUsItem images={[ SueMae ]} name="Sue Mae" title="[Market lady]" quote="I get people talking in the market" />
            <AboutUsItem images={[ KiatHan ]} name="Kiat Han" title="[Weight lifter]" quote="I support the team in areas they need help in" />
            <AboutUsItem images={[ IrvinLim, LeonMak, ChiThanh ]} name="Irvin, Leon, and Thanh" title="[3 Musketeers]" quote="We set the foundation for the rest to build" />
          </div>

        </div>
      </CardText>
    </Card>
  </div>
);

const PrivacyPolicy = () => (
  <div className="row start-xs">
  <Card className="settings-item-card col-xs">
  <CardHeader
  className="settings-title"
  title="Privacy Policy"
  actAsExpander
  showExpandableButton />
  <CardText expandable>
  <div className="settings-info">
  <h1>Privacy Policy</h1>

  <h2>Information Collection</h2>
  <p>Browsing our websites does not require your identities to be revealed. However, under the following circumstances, you are not anonymous to us.</p>

  <h2>User</h2>
  <p>We will ask for your personal information. The personal information collected includes but not restricting to the following:<br/>
  1. Private information such as name and birthdate<br/>
  2. Contact information such as email address, mobile number and physical address<br/>
  3. Additional information which we may ask for if we believe the site policies are violated<br/>
  Once you log into the account, your identity will be revealed to us.</p>

  <h2>Information Usage</h2>
  <p>The primary purpose in collecting personal information is to provide the users with a smooth and customized experience.
  We will use the information collected for the following purposes<br/>
  1. To provide its intended services<br/>
  2. To resolve disputes, and troubleshoot problems and errors<br/>
  3. To assist in law enforcement purposes and prevent/restrict the occurrences of potentially illegal or prohibited activities</p>

  <h2>Disclosure of information</h2>
  <p>We may share information with governmental agencies or other companies assisting us in fraud prevention or investigation. We may do so when:<br/>
  1. Permitted or required by law; or,<br/>
  2. Trying to protect against or prevent actual or potential fraud or unauthorized transactions; or,<br/>
  3. Investigating fraud which has already taken place.<br/>
  The information is not provided to these companies for marketing purposes.</p>

  <h2>Usage of Cookies</h2>
  <p>Cookies are small files placed in your computer hard drives. We use it to analyse our site traffic. We have also used cookies to maintain your signed in status when you login to our websites.</p>

  <h2>Commitment to Data Security</h2>
  <p>Your personally identifiable information is kept secure. Only authorized employees, agents and contractors (who have agreed to keep information secure and confidential) have access to this information. All emails and newsletters from this site allow you to opt out of further mailings.</p>

  <h2>Changes to the Policies</h2>
  <p>We reserved the rights to amend this Privacy Policy at any time. Upon posting of new policies, it will take immediate effect. We may notify you should there be any major changes to the policies.</p>
  </div>
  </CardText>
  </Card>
  </div>
);

const TOS = () => (
  <div className="row start-xs">
    <Card className="settings-item-card col-xs">
      <CardHeader
        className="settings-title"
        title="Terms of Service"
        actAsExpander
        showExpandableButton />

      <CardText expandable>
        <div className="settings-info">
          <h1>Terms of Service</h1>
          <p>Last updated: October 29, 2016</p>
          <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the http://journey.ddns.net website (the "Service") operated by Journey ("us", "we", or "our").</p>
          <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>
          <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>
          <h2>Links To Other Web Sites</h2>
          <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by Journey.</p>
          <p>Journey has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Journey shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
          <p>We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.</p>
          <h2>Termination</h2>
          <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
          <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
          <h2>Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of Singapore, without regard to its conflict of law provisions.</p>
          <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.</p>
          <h2>Changes</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
          <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>
          <h2>Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us.</p>
        </div>
      </CardText>
    </Card>
  </div>
);

const Credits = () => (
  <div className="row start-xs">
    <Card className="settings-item-card col-xs">
      <CardHeader
        className="settings-title"
        title="Credits"
        actAsExpander
        showExpandableButton />

      <CardText expandable>
        <div className="settings-info">
          <h1>Credits</h1>
          <h2>Thanks to</h2>
          <p>Prof Colin and CS3216 Staff</p>
          <p>Everyone who has contributed on ExchangeBuddy :)</p>
          <p>Subheader spread images from <Link to="https://pixabay.com/">Pixabay</Link></p>
        </div>
      </CardText>
    </Card>
  </div>
);

export default class SettingsList extends React.Component {
  render() {
    const { user, clearUser } = this.props;

    return (
      <div className="container">
        <div className="row center-xs">
          <div className="col-xs-11 col-sm-8">

            <About />
            <PrivacyPolicy />
            <TOS />
            <Credits />

            { user && isUserAdmin(user) &&
              <Link to="/admin">
                <RaisedButton primary label="Admin Dashboard" style={{ width: '100%', margin: '20px 0' }} />
              </Link>
            }

            { user && user.token &&
              <RaisedButton
                secondary
                className="settings-item-card-button"
                style={{ width: '100%', margin: '20px 0' }}
                label="Logout"
                onTouchTap={ () => logoutUser(clearUser) }/>
            }

          </div>
        </div>
      </div>
      )
  }
}

SettingsList.propTypes = {
  clearUser: React.PropTypes.func.isRequired,
  user: React.PropTypes.object,
};
