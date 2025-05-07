import type { Metadata } from 'next'

import { Typography } from '@yuki/ui/typography'

import { createMetadata } from '@/lib/metadata'
import { FaqCategories } from './_components/faq-categories'
import { FaqContact } from './_components/faq-contact'
import { FaqSearch } from './_components/faq-search'
import { FaqSection } from './_components/faq-section'

export default function FaqPage() {
  return (
    <main className="flex-1">
      <div className="container px-4 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <Typography variant="h1" className="mb-4">
              Frequently Asked Questions
            </Typography>
            <Typography variant="p" color="muted" className="mx-auto max-w-2xl">
              Find answers to the most common questions about Yuki. Can&apos;t
              find what you&apos;re looking for? Feel free to contact our
              support team.
            </Typography>
          </div>

          <FaqSearch />

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[240px_1fr]">
            <FaqCategories />

            <div className="space-y-16">
              <FaqSection
                id="account"
                title="Account & Registration"
                questions={[
                  {
                    question: 'How do I create a Yuki account?',
                    answer:
                      "Creating a Yuki account is simple. Download the Yuki app from the App Store or Google Play, then tap 'Sign Up'. You can register using your email address, or sign up with your Google, Apple, or Facebook account for faster access. Once registered, you'll need to verify your email address and set up your profile to get personalized recommendations.",
                  },
                  {
                    question: 'Can I use Yuki without creating an account?',
                    answer:
                      "Yes, you can browse products and view items without creating an account. However, to make purchases, save favorites, receive personalized recommendations, and track orders, you'll need to create an account. Creating an account is free and only takes a minute.",
                  },
                  {
                    question: 'How do I reset my password?',
                    answer:
                      "If you've forgotten your password, tap 'Forgot Password' on the login screen. Enter the email address associated with your account, and we'll send you a password reset link. Follow the instructions in the email to create a new password. For security reasons, the link expires after 24 hours.",
                  },
                  {
                    question:
                      'Can I have multiple shipping addresses in my account?',
                    answer:
                      "Yes, you can save multiple shipping addresses in your account. Go to 'Account' > 'Addresses' to add, edit, or remove shipping addresses. You can also set a default address for faster checkout. During checkout, you'll have the option to select from your saved addresses or add a new one.",
                  },
                  {
                    question: 'How do I delete my account?',
                    answer:
                      "To delete your account, go to 'Account' > 'Settings' > 'Privacy', then select 'Delete Account'. You'll need to confirm your decision and may be asked to enter your password. Please note that account deletion is permanent and will remove all your data, including order history, saved items, and preferences.",
                  },
                ]}
              />

              <FaqSection
                id="shopping"
                title="Shopping & Orders"
                questions={[
                  {
                    question: 'How do I place an order?',
                    answer:
                      "To place an order, browse or search for items you want to purchase. Tap on an item to view details, select any options (like size or color), and tap 'Add to Cart'. When you're ready to checkout, go to your cart, review your items, and tap 'Checkout'. Follow the prompts to select shipping method, enter payment information, and confirm your order.",
                  },
                  {
                    question:
                      "Can I modify or cancel my order after it's placed?",
                    answer:
                      "You can modify or cancel your order within 1 hour of placing it, as long as it hasn't entered the processing stage. Go to 'Orders' in your account, select the order you want to change, and tap 'Modify Order' or 'Cancel Order'. If the option isn't available, your order has already begun processing, and you'll need to contact customer support for assistance.",
                  },
                  {
                    question: 'How can I track my order?',
                    answer:
                      "You can track your order in the 'Orders' section of your account. Select the order you want to track to view its current status. Once your order ships, you'll receive a tracking number via email and in the app. Tap on the tracking number to see detailed shipping information, including estimated delivery date and current location.",
                  },
                  {
                    question:
                      'What should I do if an item in my order is missing or incorrect?',
                    answer:
                      "If you receive an incomplete or incorrect order, please contact us within 48 hours of delivery. Go to 'Orders', select the problematic order, and tap 'Report an Issue'. Select the specific item that's missing or incorrect, provide details about the problem, and submit. Our customer service team will contact you within 24 hours to resolve the issue.",
                  },
                  {
                    question: 'How do I find my order history?',
                    answer:
                      "Your complete order history is available in the 'Orders' section of your account. Here you can view details of all past orders, including items purchased, prices paid, shipping information, and order status. You can also download invoices for your records or for returns.",
                  },
                ]}
              />

              <FaqSection
                id="payment"
                title="Payment & Pricing"
                questions={[
                  {
                    question: 'What payment methods does Yuki accept?',
                    answer:
                      'Yuki accepts various payment methods including credit/debit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. In select regions, we also offer buy-now-pay-later options through Klarna and Afterpay. All payment information is securely encrypted and processed.',
                  },
                  {
                    question:
                      'Is it safe to save my payment information in the app?',
                    answer:
                      "Yes, it's safe to save your payment information in the Yuki app. We use industry-standard encryption and security measures to protect your data. Your full card details are never stored on our servers; instead, we use secure tokens. You can enable biometric authentication (fingerprint or face recognition) for an additional layer of security.",
                  },
                  {
                    question: 'When will my credit card be charged?',
                    answer:
                      "Your credit card will be authorized when you place an order, but you won't be charged until your order ships. If you've ordered multiple items that ship separately, you'll be charged for each item as it ships. Pre-order items will be charged when they're ready to ship, not when the pre-order is placed.",
                  },
                  {
                    question: 'Why do prices sometimes change?',
                    answer:
                      "Prices may change due to several factors including sales, promotions, demand fluctuations, or inventory adjustments. We strive to offer competitive pricing, and our app uses dynamic pricing algorithms that may adjust prices based on market conditions. If you've added an item to your cart, the price is locked for 24 hours, even if the listed price changes.",
                  },
                  {
                    question: 'How do I apply a discount code?',
                    answer:
                      "To apply a discount code, add items to your cart and proceed to checkout. On the payment page, you'll see a field labeled 'Discount Code' or 'Promo Code'. Enter your code and tap 'Apply'. If valid, the discount will be immediately applied to your order total. Please note that some discount codes cannot be combined with other promotions or applied to certain brands or products.",
                  },
                ]}
              />

              <FaqSection
                id="shipping"
                title="Shipping & Delivery"
                questions={[
                  {
                    question: 'What are the shipping options and costs?',
                    answer:
                      'Yuki offers several shipping options: Standard (3-5 business days), Express (2 business days), and Next Day. Shipping costs vary based on location, order value, and selected shipping method. Standard shipping is free for orders over $50. International shipping is available to select countries with varying delivery times and costs. Exact shipping costs will be calculated at checkout before payment.',
                  },
                  {
                    question: 'How long will it take to receive my order?',
                    answer:
                      "Delivery times depend on your location and chosen shipping method. After placing an order, you'll see an estimated delivery date. Standard shipping typically takes 3-5 business days, Express shipping takes 2 business days, and Next Day delivery orders placed before 2 PM local time will arrive the following business day. Please note that these times apply after your order has been processed, which usually takes 1-2 business days.",
                  },
                  {
                    question: 'Do you ship internationally?',
                    answer:
                      "Yes, we ship to over 40 countries worldwide. International shipping times vary by destination, typically ranging from 7-21 business days. Additional customs fees, taxes, or duties may apply depending on your country's import regulations, and these are the responsibility of the recipient. Not all products are available for international shipping due to regional restrictions.",
                  },
                  {
                    question:
                      'Can I change my shipping address after placing an order?',
                    answer:
                      "You can change your shipping address within 1 hour of placing your order, provided it hasn't entered the processing stage. Go to 'Orders', select the relevant order, and tap 'Update Shipping Address'. If this option isn't available, please contact customer support immediately, and we'll try to accommodate your request if the order hasn't shipped.",
                  },
                  {
                    question:
                      'What should I do if my package is lost or damaged?',
                    answer:
                      "If your package is lost or damaged during transit, please contact us within 48 hours of the expected delivery date. Go to 'Orders', select the affected order, and tap 'Report an Issue'. Select 'Lost Package' or 'Damaged Package', provide any relevant details, and submit. We'll work with the shipping carrier to locate lost packages or process a replacement/refund for damaged items.",
                  },
                ]}
              />

              <FaqSection
                id="returns"
                title="Returns & Refunds"
                questions={[
                  {
                    question: "What is Yuki's return policy?",
                    answer:
                      "Yuki offers a 30-day return policy for most items in new, unworn condition with original tags and packaging. Some items, such as intimates, swimwear, and final sale items, are not eligible for return. To initiate a return, go to 'Orders', select the order containing the item(s) you wish to return, and tap 'Start a Return'. Follow the instructions to complete the return process.",
                  },
                  {
                    question: 'How do I return an item?',
                    answer:
                      "To return an item, go to 'Orders' in your account, find the order with the item you want to return, and tap 'Start a Return'. Select the item(s) you're returning, provide a reason for the return, and choose your preferred refund method. You'll receive a prepaid return shipping label to print. Package the item(s) securely with all original tags and packaging, attach the label, and drop off at the specified carrier location.",
                  },
                  {
                    question: 'When will I receive my refund?',
                    answer:
                      "Once we receive and inspect your return, we'll process your refund within 3-5 business days. The time it takes for the refund to appear in your account depends on your payment method: credit/debit cards typically take 5-10 business days, while PayPal, Apple Pay, and Google Pay refunds usually process within 2-3 business days. You'll receive an email notification when your refund has been processed.",
                  },
                  {
                    question: 'Can I exchange an item instead of returning it?',
                    answer:
                      "Yes, you can exchange items for a different size or color. When initiating a return, select 'Exchange' instead of 'Return'. Choose the new item specifications (size, color, etc.), and we'll ship the replacement once we receive your original item. If the replacement item costs more, you'll be charged the difference; if it costs less, we'll refund the difference. Not all items are eligible for exchange.",
                  },
                  {
                    question: 'Do I have to pay for return shipping?',
                    answer:
                      'For standard returns, a flat return shipping fee of $5.95 will be deducted from your refund. This fee is waived for exchanges and for returns due to our error (damaged, defective, or incorrect items). Premium members receive free returns as part of their membership benefits. International returns may have different fees depending on the destination country.',
                  },
                ]}
              />

              <FaqSection
                id="app"
                title="App Features & Functionality"
                questions={[
                  {
                    question:
                      'How does the personalized recommendation system work?',
                    answer:
                      'Our AI-powered recommendation system analyzes your browsing history, purchase patterns, saved items, and style preferences to suggest products you might like. The more you interact with the app, the more accurate the recommendations become. You can improve your recommendations by rating items, saving favorites, and completing your style profile in the account settings.',
                  },
                  {
                    question: 'Can I shop from multiple stores in one order?',
                    answer:
                      "Yes, Yuki allows you to shop from multiple partner stores in a single checkout process. Items from different stores will be shipped separately, but you'll only need to enter your payment information once. You can see which store each item comes from on the product page and in your cart. Shipping costs are calculated per store, but combined orders often qualify for shipping discounts.",
                  },
                  {
                    question: 'How do I use the virtual try-on feature?',
                    answer:
                      "To use the virtual try-on feature, look for the 'Try On' button on eligible product pages. Tap it and follow the instructions to either upload a photo or use your camera. The app will overlay the item on your photo, allowing you to see how it might look on you. This feature is currently available for select clothing items, accessories, and makeup products. The accuracy may vary based on lighting and photo quality.",
                  },
                  {
                    question: 'How do I create and share wish lists?',
                    answer:
                      "To create a wish list, tap the 'Save' icon on any product to add it to your default wish list, or tap and hold to select or create a specific list. Manage your wish lists by going to 'Saved' in your account. To share a wish list, open the list, tap the 'Share' button, and choose how you want to share it (text, email, social media, etc.). You can make wish lists public or private, and even create collaborative lists that friends or family can add to.",
                  },
                  {
                    question:
                      'Is there a way to get notifications for price drops?',
                    answer:
                      "Yes, you can set price drop alerts for specific items. When viewing a product, tap the bell icon to set an alert. You can choose to be notified when the price drops by any amount, or only when it drops by a specific percentage (e.g., 10%, 20%, etc.). You'll receive a push notification and email when the price changes. You can manage all your price alerts in the 'Notifications' section of your account settings.",
                  },
                ]}
              />

              <FaqSection
                id="privacy"
                title="Privacy & Security"
                questions={[
                  {
                    question: 'How does Yuki protect my personal information?',
                    answer:
                      'Yuki employs industry-standard security measures to protect your personal information, including encryption, secure socket layer (SSL) technology, and regular security audits. We use tokenization for payment information, meaning your full card details are never stored on our servers. We also offer two-factor authentication and biometric login options for additional account security. Our privacy practices comply with global data protection regulations.',
                  },
                  {
                    question: 'What information does Yuki collect about me?',
                    answer:
                      'Yuki collects information you provide directly (such as account details, purchase history, and preferences) and information collected automatically (such as device information, app usage, and browsing behavior). This data is used to provide and improve our services, personalize your shopping experience, process transactions, and communicate with you. You can review and manage your data collection preferences in the Privacy section of your account settings.',
                  },
                  {
                    question:
                      'Does Yuki share my information with third parties?',
                    answer:
                      'Yuki shares limited information with third parties in specific circumstances: with partner stores to fulfill your orders, with payment processors to complete transactions, and with service providers who help operate our platform. We may also share anonymized, aggregated data for analytics purposes. We do not sell your personal information to third parties for marketing purposes. You can opt out of certain types of data sharing in your privacy settings.',
                  },
                  {
                    question: 'How can I manage my privacy settings?',
                    answer:
                      "To manage your privacy settings, go to 'Account' > 'Settings' > 'Privacy'. Here you can control what data is collected, how it's used, and who it's shared with. Options include controlling personalization features, managing marketing preferences, limiting data collection for analytics, and requesting a copy or deletion of your data. Changes to these settings take effect immediately but may affect certain app functionalities.",
                  },
                  {
                    question: 'How do I opt out of marketing communications?',
                    answer:
                      "You can opt out of marketing communications in several ways: tap the 'Unsubscribe' link in any marketing email, go to 'Account' > 'Settings' > 'Notifications' to manage email and push notification preferences, or go to 'Account' > 'Settings' > 'Privacy' > 'Marketing Preferences' for more detailed controls. You can choose to opt out of all marketing or just specific types (e.g., promotions, product recommendations, or newsletters).",
                  },
                ]}
              />
            </div>
          </div>

          <FaqContact />
        </div>
      </div>
    </main>
  )
}

export const metadata: Metadata = createMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about Yuki e-commerce app, orders, shipping, returns, and more.',
  openGraph: { url: '/faq' },
})
