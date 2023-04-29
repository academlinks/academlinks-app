import styles from "./styles/termsAndPolicy.module.scss";

function Policy(props) {
  return (
    <div className={styles.policyContainer}>
      <div className={styles.policy}>
        <div>
          <p>
            <span>
              <span>
                At <strong>Academlinks</strong>
              </span>
              &nbsp;
              <span>we take your privacy very seriously.</span>
            </span>
          </p>
          <p>
            <span>
              This Privacy Policy explains how we collect, use and protect your
              personal information when you use our social network.
            </span>
          </p>
        </div>

        <div>
          <h3>Information We Collect</h3>
          <br />
          <p>
            <span>
              We collect various types of personal information from you when you
              use our social network, including:
            </span>
          </p>

          <p>
            <span>Your name, username, and email address</span>
            <span>
              Your profile picture and other photos or videos you upload
            </span>
            <span>Information about your location</span>
            <span>
              Information about your device, such as the type of device and
              operating system you use
            </span>
            <span>
              Information about your use of our social network, including your
              interactions with other users and the content you share or view.
            </span>
          </p>
        </div>

        <div>
          <h3>How We Use Your Information</h3>
          <br />
          <p>
            <span>
              We use your personal information to provide and improve our social
              network, including:
            </span>
          </p>

          <p>
            <span>
              Allowing you to create and maintain a profile and connect with
              other users
            </span>
            <span>
              Enabling you to share content and communicate with other users
            </span>
            <span>
              Providing you with personalized recommendations and advertising
            </span>
            <span>
              Analyzing how you use our social network to improve our services
            </span>
          </p>
        </div>

        <div>
          <h3>How We Protect Your Information</h3>
          <br />
          <p>
            <span>
              We take steps to protect your personal information from
              unauthorized access, use, or disclosure. We use a variety of
              security measures, including encryption and secure storage, to
              keep your data safe. We also limit access to your personal
              information to employees who need it to provide our services.
            </span>
          </p>
        </div>

        <div>
          <h3>Sharing Your Information</h3>
          <br />
          <p>
            <span>
              We may share your personal information with third-party service
              providers who help us provide our social network, such as hosting
              providers and payment processors. We may also share your
              information with other users of our social network, such as when
              you connect with someone or share content with them. Finally, we
              may share your information as required by law or to protect our
              rights or the rights of others.
            </span>
          </p>
        </div>

        <div>
          <h3>Your Choices</h3>
          <br />
          <p>
            <span>
              You can choose whether to provide us with certain personal
              information, but this may limit your ability to use certain
              features of our social network. You can also choose to opt-out of
              certain types of communications from us, such as marketing emails.
              You can update or delete your personal information at any time by
              accessing your profile settings.
            </span>
          </p>
        </div>

        <div>
          <h3>Changes to This Policy</h3>
          <br />
          <p>
            <span>
              We may update this Privacy Policy from time to time. If we make
              significant changes, we will provide notice to you in accordance
              with applicable law.
            </span>
          </p>
        </div>

        <div>
          <p>
            <span>
              If you have any questions or concerns about this Privacy Policy,
              please contact us at&nbsp;<strong>info@academlinks.com</strong>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Policy;
