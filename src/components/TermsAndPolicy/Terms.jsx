import { Link } from "react-router-dom";
import styles from "./styles/termsAndPolicy.module.scss";

function Terms(props) {
  return (
    <div className={styles.policyContainer}>
      <div className={styles.policy}>
        <div>
          <p>
            <h2>
              <span>Terms and Conditions of Use for</span>
              &nbsp;
              <span>
                <strong>Academlinks</strong>.
              </span>
            </h2>
          </p>
          <br />
          <p>
            <span>
              Welcome to Academlinks. Academlinks is a professional social
              network designed for &nbsp;{" "}
              <strong>
                <i>academicians</i>
              </strong>
              ,&nbsp;
              <strong>
                <i>researchers</i>
              </strong>
              &nbsp; and &nbsp;
              <strong>
                <i>lecturers</i>
              </strong>
              &nbsp; to connect, collaborate, and share industry-specific
              information. By using Academlinks, you agree to these Terms and
              Conditions of Use ("Terms"), which form a binding agreement
              between you and Academlinks. Please, read these Terms carefully
              before using Academlinks. If you do not agree to these Terms, you
              may not use Academlinks.
            </span>
          </p>
        </div>

        <div>
          <h3>Acceptance of Terms</h3>
          <br />
          <p>
            <span>
              By using Academlinks, you agree to these Terms, as well as our
              &nbsp;
              <Link to="policy" className={styles.link}>
                Privacy Policy
              </Link>
              &nbsp;. We reserve the right to modify these Terms at any time,
              without prior notice. Your continued use of Academlinks after any
              such modifications will constitute your acceptance of the modified
              Terms.
            </span>
          </p>
        </div>

        <div>
          <h3>Registration and Account</h3>
          <br />
          <p>
            <span>
              In order to use Academlinks, you must register and create an
              account. You must provide accurate and complete information when
              registering, and you are responsible for keeping your account
              information up-to-date. You may not create an account for anyone
              other than yourself, and you may not use another person's account
              without their permission. You are responsible for maintaining the
              confidentiality of your account login information and for any
              activity that occurs on your account.
            </span>
          </p>
        </div>

        <div>
          <h3>User Conduct</h3>
          <br />
          <p>
            <span>
              You are solely responsible for your conduct on Academlinks. You
              agree to use Academlinks in a manner consistent with its intended
              purpose, and in compliance with all applicable laws and
              regulations. You may not use Academlinks to transmit any content
              that is unlawful, harmful, threatening, abusive, harassing,
              defamatory, vulgar, obscene, invasive of another's privacy, or
              otherwise objectionable. You may not use Academlinks to engage in
              any activity that could harm Academlinks or its users, including
              but not limited to hacking, spamming, or transmitting viruses or
              other harmful code. You may not use Academlinks to promote or
              advertise products or services without our prior written consent.
            </span>
          </p>
        </div>

        <div>
          <h3>Content</h3>
          <br />
          <p>
            <span>
              Academlinks allows users to post content, including but not
              limited to text, images, and videos. You are solely responsible
              for any content that you post on Academlinks, and you represent
              and warrant that you have all necessary rights to post such
              content. By posting content on Academlinks, you grant Academlinks
              a non-exclusive, transferable, sub-licensable, royalty-free,
              worldwide license to use, copy, modify, create derivative works
              based on, distribute, publicly display, publicly perform, and
              otherwise exploit in any manner such content in all formats and
              distribution channels now known or hereafter devised.
            </span>
          </p>
        </div>

        <div>
          <h3>Intellectual Property</h3>
          <br />
          <p>
            <span>
              Academlinks and its content, including but not limited to text,
              images, and logos, are the property of Academlinks or its
              licensors and are protected by copyright, trademark, and other
              intellectual property laws. You may not use any Academlinks
              content without our prior written consent.
            </span>
          </p>
        </div>

        <div>
          <h3>Termination</h3>
          <br />
          <p>
            <span>
              We reserve the right to terminate your account and/or access to
              Academlinks at any time, without prior notice, if we believe that
              you have violated these Terms or any applicable laws or
              regulations. You may also terminate your account at any time by
              contacting us.
            </span>
          </p>
        </div>

        <div>
          <h3>Disclaimer of Warranties</h3>
          <br />
          <p>
            <span>
              Academlinks is provided on an "as is" and "as available" basis,
              without warranties of any kind, either express or implied.
              Academlinks does not warrant that Academlinks will be
              uninterrupted or error-free, or that Academlinks will meet your
              specific requirements. Academlinks does not warrant the accuracy,
              completeness, or reliability of any content on Academlinks, and
              you acknowledge that you rely on any content on Academlinks at
              your own risk.
            </span>
          </p>
        </div>

        <div>
          <h3>Limitation of Liability</h3>
          <br />
          <p>
            <span>
              In no event shall Academlinks be liable for any indirect,
              incidental, special, consequential, or punitive damages, including
              but not limited to, damages for loss of profits, goodwill, use,
              data, or other intangible losses, arising out of or in connection
              with your use of Academlinks, whether based on contract, tort,
              strict liability, or otherwise, even if Academlinks has been
              advised of the possibility of such damages.
            </span>
          </p>
        </div>

        <div>
          <h3>Indemnification</h3>
          <br />
          <p>
            <span>
              You agree to indemnify and hold harmless Academlinks, its
              affiliates, officers, directors, employees, and agents from and
              against any and all claims, damages, obligations, losses,
              liabilities, costs, and expenses (including but not limited to
              attorney's fees) arising out of or in connection with your use of
              Academlinks, your content, or your violation of these Terms or any
              applicable laws or regulations.
            </span>
          </p>
        </div>

        <div>
          <h3>Governing Law</h3>
          <br />
          <p>
            <span>
              These Terms and your use of Academlinks shall be governed by and
              construed in accordance with the laws of the jurisdiction in which
              Academlinks is located, without giving effect to any principles of
              conflicts of law.
            </span>
          </p>
        </div>

        <div>
          <h3>Miscellaneous</h3>
          <br />
          <p>
            <span>
              These Terms constitute the entire agreement between you and
              Academlinks with respect to your use of Academlinks, and supersede
              all prior or contemporaneous communications and proposals, whether
              oral or written, between you and Academlinks. If any provision of
              these Terms is found to be invalid or unenforceable, the remaining
              provisions shall remain in full force and effect. Academlinks’s
              failure to enforce any right or provision of these Terms shall not
              be deemed a waiver of such right or provision.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Terms;
