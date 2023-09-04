import { IntegrationError } from '@segment/actions-core'
import { InputField } from '@segment/actions-core/destination-kit/types'
import { createHash } from 'crypto'
import { Settings } from '../snap-conversions-api/generated-types'
import { Payload } from './reportConversionEvent/generated-types'

export const CURRENCY_ISO_4217_CODES = new Set([
  'USD',
  'AED',
  'AUD',
  'BGN',
  'BRL',
  'CAD',
  'CHF',
  'CLP',
  'CNY',
  'COP',
  'CZK',
  'DKK',
  'EGP',
  'EUR',
  'GBP',
  'GIP',
  'HKD',
  'HRK',
  'HUF',
  'IDR',
  'ILS',
  'INR',
  'JPY',
  'KRW',
  'KWD',
  'KZT',
  'LBP',
  'MXN',
  'MYR',
  'NGN',
  'NOK',
  'NZD',
  'PEN',
  'PHP',
  'PKR',
  'PLN',
  'QAR',
  'RON',
  'RUB',
  'SAR',
  'SEK',
  'SGD',
  'THB',
  'TRY',
  'TWD',
  'TZS',
  'UAH',
  'VND',
  'ZAR',
  'ALL',
  'BHD',
  'DZD',
  'GHS',
  'IQD',
  'ISK',
  'JOD',
  'KES',
  'MAD',
  'OMR',
  'XOF'
])

export const COUNTRY_ISO_3166_CODES = new Set([
  'AD',
  'AE',
  'AF',
  'AG',
  'AI',
  'AL',
  'AM',
  'AO',
  'AQ',
  'AR',
  'AS',
  'AT',
  'AU',
  'AW',
  'AX',
  'AZ',
  'BA',
  'BB',
  'BD',
  'BE',
  'BF',
  'BG',
  'BH',
  'BI',
  'BJ',
  'BL',
  'BM',
  'BN',
  'BO',
  'BQ',
  'BR',
  'BS',
  'BT',
  'BV',
  'BW',
  'BY',
  'BZ',
  'CA',
  'CC',
  'CD',
  'CF',
  'CG',
  'CH',
  'CI',
  'CK',
  'CL',
  'CM',
  'CN',
  'CO',
  'CR',
  'CU',
  'CV',
  'CW',
  'CX',
  'CY',
  'CZ',
  'DE',
  'DJ',
  'DK',
  'DM',
  'DO',
  'DZ',
  'EC',
  'EE',
  'EG',
  'EH',
  'ER',
  'ES',
  'ET',
  'FI',
  'FJ',
  'FK',
  'FM',
  'FO',
  'FR',
  'GA',
  'GB',
  'GD',
  'GE',
  'GF',
  'GG',
  'GH',
  'GI',
  'GL',
  'GM',
  'GN',
  'GP',
  'GQ',
  'GR',
  'GS',
  'GT',
  'GU',
  'GW',
  'GY',
  'HK',
  'HM',
  'HN',
  'HR',
  'HT',
  'HU',
  'ID',
  'IE',
  'IL',
  'IM',
  'IN',
  'IO',
  'IQ',
  'IR',
  'IS',
  'IT',
  'JE',
  'JM',
  'JO',
  'JP',
  'KE',
  'KG',
  'KH',
  'KI',
  'KM',
  'KN',
  'KP',
  'KR',
  'KW',
  'KY',
  'KZ',
  'LA',
  'LB',
  'LC',
  'LI',
  'LK',
  'LR',
  'LS',
  'LT',
  'LU',
  'LV',
  'LY',
  'MA',
  'MC',
  'MD',
  'ME',
  'MF',
  'MG',
  'MH',
  'MK',
  'ML',
  'MM',
  'MN',
  'MO',
  'MP',
  'MQ',
  'MR',
  'MS',
  'MT',
  'MU',
  'MV',
  'MW',
  'MX',
  'MY',
  'MZ',
  'NA',
  'NC',
  'NE',
  'NF',
  'NG',
  'NI',
  'NL',
  'NO',
  'NP',
  'NR',
  'NU',
  'NZ',
  'OM',
  'PA',
  'PE',
  'PF',
  'PG',
  'PH',
  'PK',
  'PL',
  'PM',
  'PN',
  'PR',
  'PS',
  'PT',
  'PW',
  'PY',
  'QA',
  'RE',
  'RO',
  'RS',
  'RU',
  'RW',
  'SA',
  'SB',
  'SC',
  'SD',
  'SE',
  'SG',
  'SH',
  'SI',
  'SJ',
  'SK',
  'SL',
  'SM',
  'SN',
  'SO',
  'SR',
  'SS',
  'ST',
  'SV',
  'SX',
  'SY',
  'SZ',
  'TC',
  'TD',
  'TF',
  'TG',
  'TH',
  'TJ',
  'TK',
  'TL',
  'TM',
  'TN',
  'TO',
  'TR',
  'TT',
  'TV',
  'TW',
  'TZ',
  'UA',
  'UG',
  'UM',
  'US',
  'UY',
  'UZ',
  'VA',
  'VC',
  'VE',
  'VG',
  'VI',
  'VN',
  'VU',
  'WF',
  'WS',
  'YE',
  'YT',
  'ZA',
  'ZM',
  'ZW'
])

export const event_type: InputField = {
  label: 'Event Type',
  description:
    'The conversion event type. For custom events, you must use one of the predefined event types (i.e. CUSTOM_EVENT_1). Please refer to the possible event types in [Snapchat Marketing API docs](https://marketingapi.snapchat.com/docs/conversion.html#conversion-parameters).',
  type: 'string'
}

export const event_conversion_type: InputField = {
  label: 'Event Conversion Type',
  description: 'Where the event took place. This must be OFFLINE, WEB, or MOBILE_APP.',
  type: 'string',
  choices: [
    { label: 'Offline', value: 'OFFLINE' },
    { label: 'Web', value: 'WEB' },
    { label: 'Mobile App', value: 'MOBILE_APP' }
  ]
}

export const event_tag: InputField = {
  label: 'Event Tag',
  description: 'Custom event label.',
  type: 'string'
}

export const timestamp: InputField = {
  label: 'Event Timestamp',
  description:
    'The Epoch timestamp for when the conversion happened.  The timestamp cannot be more than 28 days in the past.',
  type: 'string',
  default: {
    '@path': '$.timestamp'
  }
}

export const email: InputField = {
  label: 'Email',
  description:
    'Email address of the user who triggered the conversion event. Segment will normalize and hash this value before sending to Snapchat. [Snapchat requires](https://marketingapi.snapchat.com/docs/conversion.html#conversion-parameters) that every payload contain values for Email or Phone Number or Mobile Ad Identifier or both IP Address and User Agent fields. Also see [Segment documentation](https://segment.com/docs/connections/destinations/catalog/actions-snap-conversions/#required-parameters-and-hashing).',
  type: 'string',
  default: {
    '@if': {
      exists: { '@path': '$.properties.email' },
      then: { '@path': '$.properties.email' },
      else: { '@path': '$.traits.email' }
    }
  }
}

export const mobile_ad_id: InputField = {
  label: 'Mobile Ad Identifier',
  description:
    'Mobile ad identifier (IDFA or AAID) of the user who triggered the conversion event. Segment will normalize and hash this value before sending to Snapchat. [Snapchat requires](https://marketingapi.snapchat.com/docs/conversion.html#conversion-parameters) that every payload contain values for Email or Phone Number or Mobile Ad Identifier or both IP Address and User Agent fields. Also see [Segment documentation](https://segment.com/docs/connections/destinations/catalog/actions-snap-conversions/#required-parameters-and-hashing).',
  type: 'string',
  default: {
    '@path': '$.context.device.advertisingId'
  }
}

export const uuid_c1: InputField = {
  label: 'uuid_c1 Cookie',
  description:
    'Unique user ID cookie. If you are using the Pixel SDK, you can access a cookie1 by looking at the _scid value.',
  type: 'string'
}

export const idfv: InputField = {
  label: 'Identifier for Vendor',
  description: 'IDFV of the user’s device. Segment will normalize and hash this value before sending to Snapchat.',
  type: 'string',
  default: {
    '@path': '$.context.device.id'
  }
}

export const phone_number: InputField = {
  label: 'Phone Number',
  description:
    'Phone number of the user who triggered the conversion event. Segment will normalize and hash this value before sending to Snapchat. [Snapchat requires](https://marketingapi.snapchat.com/docs/conversion.html#conversion-parameters) that every payload contain values for Email or Phone Number or Mobile Ad Identifier or both IP Address and User Agent fields. Also see [Segment documentation](https://segment.com/docs/connections/destinations/catalog/actions-snap-conversions/#required-parameters-and-hashing).',
  type: 'string',
  default: {
    '@if': {
      exists: { '@path': '$.properties.phone' },
      then: { '@path': '$.properties.phone' },
      else: { '@path': '$.traits.phone' }
    }
  }
}

export const user_agent: InputField = {
  label: 'User Agent',
  description:
    'User agent from the user’s device. [Snapchat requires](https://marketingapi.snapchat.com/docs/conversion.html#conversion-parameters) that every payload contain values for Email or Phone Number or Mobile Ad Identifier or both IP Address and User Agent fields. Also see [Segment documentation](https://segment.com/docs/connections/destinations/catalog/actions-snap-conversions/#required-parameters-and-hashing).',
  type: 'string',
  default: {
    '@path': '$.context.userAgent'
  }
}

export const ip_address: InputField = {
  label: 'IP Address',
  description:
    'IP address of the device or browser. Segment will normalize and hash this value before sending to Snapchat. [Snapchat requires](https://marketingapi.snapchat.com/docs/conversion.html#conversion-parameters) that every payload contain values for Email or Phone Number or Mobile Ad Identifier or both IP Address and User Agent fields. Also see [Segment documentation](https://segment.com/docs/connections/destinations/catalog/actions-snap-conversions/#required-parameters-and-hashing).',
  type: 'string',
  default: {
    '@path': '$.context.ip'
  }
}

export const item_category: InputField = {
  label: 'Item Category',
  description: 'Category of the item.',
  type: 'string',
  default: {
    '@path': '$.properties.category'
  }
}

export const item_ids: InputField = {
  label: 'Item IDs',
  description: 'International Article Number (EAN) when applicable, or other product or category identifier.',
  type: 'string',
  default: {
    '@path': '$.properties.product_id'
  }
}

export const description: InputField = {
  label: 'Description',
  description: 'A string description for additional info.',
  type: 'string'
}

export const number_items: InputField = {
  label: 'Number of Items',
  description: 'Number of items.',
  type: 'string',
  default: {
    '@path': '$.properties.quantity'
  }
}

export const price: InputField = {
  label: 'Price',
  description: 'Value of the purchase.This should be a single number.',
  type: 'number',
  default: {
    '@if': {
      exists: { '@path': '$.properties.price' },
      then: { '@path': '$.properties.price' },
      else: { '@path': '$.properties.value' }
    }
  }
}

export const currency: InputField = {
  label: 'Currency',
  description: 'Currency for the value specified as ISO 4217 code.',
  type: 'string',
  default: {
    '@path': '$.properties.currency'
  }
}

export const transaction_id: InputField = {
  label: 'Transaction ID',
  description:
    'Transaction ID or order ID tied to the conversion event. Please refer to the [Snapchat Marketing API docs](https://marketingapi.snapchat.com/docs/conversion.html#deduplication) for information on how this field is used for deduplication against Snap Pixel SDK and App Ads Kit events.',
  type: 'string',
  default: {
    '@path': '$.properties.order_id'
  }
}

export const level: InputField = {
  label: 'Level',
  description: 'Represents a level in the context of a game.',
  type: 'string'
}

export const client_dedup_id: InputField = {
  label: 'Client Deduplication ID',
  description:
    'If you are reporting events via more than one method (Snap Pixel, App Ads Kit, Conversions API) you should use the same client_dedup_id across all methods. Please refer to the [Snapchat Marketing API docs](https://marketingapi.snapchat.com/docs/conversion.html#deduplication) for information on how this field is used for deduplication against Snap Pixel SDK and App Adds Kit events.',
  type: 'string'
}

export const search_string: InputField = {
  label: 'Search String',
  description: 'The text string that was searched for.',
  type: 'string',
  default: {
    '@path': '$.properties.query'
  }
}

export const page_url: InputField = {
  label: 'Page URL',
  description: 'The URL of the web page where the event took place.',
  type: 'string',
  default: {
    '@path': '$.context.page.url'
  }
}

export const sign_up_method: InputField = {
  label: 'Sign Up Method',
  description: 'A string indicating the sign up method.',
  type: 'string'
}

export const device_model: InputField = {
  label: 'Device Model',
  description: 'The user’s device model.',
  type: 'string'
}

export const os_version: InputField = {
  label: 'OS Version',
  description: 'The user’s OS version.',
  type: 'string'
}

export const click_id: InputField = {
  label: 'Click ID',
  description:
    "The ID value stored in the landing page URL's `&ScCid=` query parameter. Using this ID improves ad measurement performance. We also encourage advertisers who are using `click_id` to pass the full url in the `page_url` field. For more details, please refer to [Sending a Click ID](#sending-a-click-id)",
  type: 'string'
}

export const first_name: InputField = {
  label: 'First name',
  description: 'First name of the converted user.',
  type: 'string'
}

export const middle_name: InputField = {
  label: 'Middle name',
  description: 'Middle name of the converted user.',
  type: 'string'
}

export const last_name: InputField = {
  label: 'Last name',
  description: 'Last name of the converted user.',
  type: 'string'
}

export const city: InputField = {
  label: 'City',
  description: 'City associated with the conversion.',
  type: 'string'
}

export const state: InputField = {
  label: 'State',
  description: 'State or region associated with the conversion.',
  type: 'string'
}

export const zip: InputField = {
  label: 'Zip',
  description: 'Zip or postal code associated with the conversion.',
  type: 'string'
}

export const dob_month: InputField = {
  label: 'Birthday Month',
  description: 'Birth month of the converted user.',
  type: 'string'
}

export const dob_day: InputField = {
  label: 'Day of the Birthday',
  description: 'Day of the month that the converted user was born.',
  type: 'string'
}

export const country: InputField = {
  label: 'Country',
  description:
    'Country associated with the conversion. Must be provided as a two letter [ISO 3166 alpha-2 country code](https://www.iso.org/obp/ui/#search).',
  type: 'string'
}

export const region: InputField = {
  label: 'Region',
  description:
    'State or region associated with the conversion. If the country is US, provide a two letter State code (`CA`, `WA`), otherwise provide the full region name.',
  type: 'string'
}

//Check to see what ids need to be passed depending on the event_conversion_type
export const conversionType = (settings: Settings, event_conversion_type: String): Settings => {
  if (event_conversion_type === 'MOBILE_APP') {
    if (!settings?.snap_app_id || !settings?.app_id) {
      throw new IntegrationError(
        'If event conversion type is "MOBILE_APP" then Snap App ID and App ID must be defined',
        'Misconfigured required field',
        400
      )
    }
    delete settings?.pixel_id
  } else {
    if (!settings?.pixel_id) {
      throw new IntegrationError(
        `If event conversion type is "${event_conversion_type}" then Pixel ID must be defined`,
        'Misconfigured required field',
        400
      )
    }
    delete settings?.snap_app_id
    delete settings?.app_id
  }
  return settings
}

export const hash = (value: string | undefined): string | undefined => {
  if (value === undefined) return

  const hash = createHash('sha256')
  hash.update(value)
  return hash.digest('hex')
}

const isHashedEmail = (email: string): boolean => new RegExp(/[0-9abcdef]{64}/gi).test(email)

export const formatPayload = (payload: Payload): Object => {
  //Normalize fields based on Snapchat Data Hygiene https://marketingapi.snapchat.com/docs/conversion.html#auth-requirements
  if (payload.email) {
    //Removes all leading and trailing whitespace and converts all characters to lowercase.
    payload.email = payload.email.replace(/\s/g, '').toLowerCase()
  }

  if (payload.phone_number) {
    //Removes all non-numberic characters and leading zeros.
    payload.phone_number = payload.phone_number.replace(/\D|^0+/g, '')
  }

  if (payload.mobile_ad_id) {
    //Converts all characters to lowercase
    payload.mobile_ad_id = payload.mobile_ad_id.toLowerCase()
  }

  if (payload.idfv) {
    //Converts all characters to lowercase
    payload.idfv = payload.idfv.toLowerCase()
  }

  return {
    event_type: payload?.event_type,
    event_conversion_type: payload?.event_conversion_type,
    event_tag: payload?.event_tag,
    timestamp: Date.parse(payload?.timestamp),
    hashed_email: isHashedEmail(String(payload?.email)) ? payload?.email : hash(payload?.email),
    hashed_mobile_ad_id: hash(payload?.mobile_ad_id),
    uuid_c1: payload?.uuid_c1,
    hashed_idfv: hash(payload?.idfv),
    hashed_phone_number: hash(payload?.phone_number),
    user_agent: payload?.user_agent,
    hashed_ip_address: hash(payload?.ip_address),
    item_category: payload?.item_category,
    item_ids: payload?.item_ids,
    description: payload?.description,
    number_items: payload?.number_items,
    price: payload?.price,
    currency: payload?.currency,
    transaction_id: payload?.transaction_id,
    level: payload?.level,
    client_dedup_id: payload?.client_dedup_id,
    search_string: payload?.search_string,
    page_url: payload?.page_url,
    sign_up_method: payload?.sign_up_method,
    device_model: payload?.device_model,
    os_version: payload?.os_version,
    click_id: payload?.click_id,
    hashed_first_name_sha: hash(payload?.first_name),
    hashed_middle_name_sha: hash(payload?.middle_name),
    hashed_last_name_sha: hash(payload?.last_name),
    hashed_city_sha: hash(payload?.city),
    hashed_state_sha: hash(payload?.state),
    hashed_zip: hash(payload?.zip),
    hashed_dob_month: hash(payload?.dob_month),
    hashed_dob_day: hash(payload?.dob_day),
    country: payload?.country,
    region: payload?.region
  }
}
