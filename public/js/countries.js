// The data is from the ISO 3166-1 standard. The data is licensed under the Open Database License (ODbL) v1.0.
// SVGs used are from https://github.com/phortuin/twimg
// Functions by seventwentyseven team
// All content used belongs to their respective owners.

const COUNTRIES = {
  'AF': {
      'en_short_name': 'Afghanistan',
      'nationality': 'Afghan',
      'flag': '/public/images/flags/af.svg'
  },
  'AX': {
      'en_short_name': 'Åland Islands',
      'nationality': 'Åland Island',
      'flag': '/public/images/flags/ax.svg'
  },
  'AL': {
      'en_short_name': 'Albania',
      'nationality': 'Albanian',
      'flag': '/public/images/flags/al.svg'
  },
  'DZ': {
      'en_short_name': 'Algeria',
      'nationality': 'Algerian',
      'flag': '/public/images/flags/dz.svg'
  },
  'AS': {
      'en_short_name': 'American Samoa',
      'nationality': 'American Samoan',
      'flag': '/public/images/flags/as.svg'
  },
  'AD': {
      'en_short_name': 'Andorra',
      'nationality': 'Andorran',
      'flag': '/public/images/flags/ad.svg'
  },
  'AO': {
      'en_short_name': 'Angola',
      'nationality': 'Angolan',
      'flag': '/public/images/flags/ao.svg'
  },
  'AI': {
      'en_short_name': 'Anguilla',
      'nationality': 'Anguillan',
      'flag': '/public/images/flags/ai.svg'
  },
  'AQ': {
      'en_short_name': 'Antarctica',
      'nationality': 'Antarctic',
      'flag': '/public/images/flags/aq.svg'
  },
  'AG': {
      'en_short_name': 'Antigua and Barbuda',
      'nationality': 'Antiguan or Barbudan',
      'flag': '/public/images/flags/ag.svg'
  },
  'AR': {
      'en_short_name': 'Argentina',
      'nationality': 'Argentine',
      'flag': '/public/images/flags/ar.svg'
  },
  'AM': {
      'en_short_name': 'Armenia',
      'nationality': 'Armenian',
      'flag': '/public/images/flags/am.svg'
  },
  'AW': {
      'en_short_name': 'Aruba',
      'nationality': 'Aruban',
      'flag': '/public/images/flags/aw.svg'
  },
  'AU': {
      'en_short_name': 'Australia',
      'nationality': 'Australian',
      'flag': '/public/images/flags/au.svg'
  },
  'AT': {
      'en_short_name': 'Austria',
      'nationality': 'Austrian',
      'flag': '/public/images/flags/at.svg'
  },
  'AZ': {
      'en_short_name': 'Azerbaijan',
      'nationality': 'Azerbaijani',
      'flag': '/public/images/flags/az.svg'
  },
  'BS': {
      'en_short_name': 'Bahamas',
      'nationality': 'Bahamian',
      'flag': '/public/images/flags/bs.svg'
  },
  'BH': {
      'en_short_name': 'Bahrain',
      'nationality': 'Bahraini',
      'flag': '/public/images/flags/bh.svg'
  },
  'BD': {
      'en_short_name': 'Bangladesh',
      'nationality': 'Bangladeshi',
      'flag': '/public/images/flags/bd.svg'
  },
  'BB': {
      'en_short_name': 'Barbados',
      'nationality': 'Barbadian',
      'flag': '/public/images/flags/bb.svg'
  },
  'BY': {
      'en_short_name': 'Belarus',
      'nationality': 'Belarusian',
      'flag': '/public/images/flags/by.svg'
  },
  'BE': {
      'en_short_name': 'Belgium',
      'nationality': 'Belgian',
      'flag': '/public/images/flags/be.svg'
  },
  'BZ': {
      'en_short_name': 'Belize',
      'nationality': 'Belizean',
      'flag': '/public/images/flags/bz.svg'
  },
  'BJ': {
      'en_short_name': 'Benin',
      'nationality': 'Beninese',
      'flag': '/public/images/flags/bj.svg'
  },
  'BM': {
      'en_short_name': 'Bermuda',
      'nationality': 'Bermudian',
      'flag': '/public/images/flags/bm.svg'
  },
  'BT': {
      'en_short_name': 'Bhutan',
      'nationality': 'Bhutanese',
      'flag': '/public/images/flags/bt.svg'
  },
  'BO': {
      'en_short_name': 'Bolivia (Plurinational State of)',
      'nationality': 'Bolivian',
      'flag': '/public/images/flags/bo.svg'
  },
  'BQ': {
      'en_short_name': 'Bonaire, Sint Eustatius and Saba',
      'nationality': 'Bonaire',
      'flag': '/public/images/flags/bq.svg'
  },
  'BA': {
      'en_short_name': 'Bosnia and Herzegovina',
      'nationality': 'Bosnian or Herzegovinian',
      'flag': '/public/images/flags/ba.svg'
  },
  'BW': {
      'en_short_name': 'Botswana',
      'nationality': 'Botswanan',
      'flag': '/public/images/flags/bw.svg'
  },
  'BV': {
      'en_short_name': 'Bouvet Island',
      'nationality': 'Bouvet Island',
      'flag': '/public/images/flags/bv.svg'
  },
  'BR': {
      'en_short_name': 'Brazil',
      'nationality': 'Brazilian',
      'flag': '/public/images/flags/br.svg'
  },
  'IO': {
      'en_short_name': 'British Indian Ocean Territory',
      'nationality': 'BIOT',
      'flag': '/public/images/flags/io.svg'
  },
  'BN': {
      'en_short_name': 'Brunei Darussalam',
      'nationality': 'Bruneian',
      'flag': '/public/images/flags/bn.svg'
  },
  'BG': {
      'en_short_name': 'Bulgaria',
      'nationality': 'Bulgarian',
      'flag': '/public/images/flags/bg.svg'
  },
  'BF': {
      'en_short_name': 'Burkina Faso',
      'nationality': 'Burkinabé',
      'flag': '/public/images/flags/bf.svg'
  },
  'BI': {
      'en_short_name': 'Burundi',
      'nationality': 'Burundian',
      'flag': '/public/images/flags/bi.svg'
  },
  'CV': {
      'en_short_name': 'Cabo Verde',
      'nationality': 'Cabo Verdean',
      'flag': '/public/images/flags/cv.svg'
  },
  'KH': {
      'en_short_name': 'Cambodia',
      'nationality': 'Cambodian',
      'flag': '/public/images/flags/kh.svg'
  },
  'CM': {
      'en_short_name': 'Cameroon',
      'nationality': 'Cameroonian',
      'flag': '/public/images/flags/cm.svg'
  },
  'CA': {
      'en_short_name': 'Canada',
      'nationality': 'Canadian',
      'flag': '/public/images/flags/ca.svg'
  },
  'KY': {
      'en_short_name': 'Cayman Islands',
      'nationality': 'Caymanian',
      'flag': '/public/images/flags/ky.svg'
  },
  'CF': {
      'en_short_name': 'Central African Republic',
      'nationality': 'Central African',
      'flag': '/public/images/flags/cf.svg'
  },
  'TD': {
      'en_short_name': 'Chad',
      'nationality': 'Chadian',
      'flag': '/public/images/flags/td.svg'
  },
  'CL': {
      'en_short_name': 'Chile',
      'nationality': 'Chilean',
      'flag': '/public/images/flags/cl.svg'
  },
  'CN': {
      'en_short_name': 'China',
      'nationality': 'Chinese',
      'flag': '/public/images/flags/cn.svg'
  },
  'CX': {
      'en_short_name': 'Christmas Island',
      'nationality': 'Christmas Island',
      'flag': '/public/images/flags/cx.svg'
  },
  'CC': {
      'en_short_name': 'Cocos Islands',
      'nationality': 'Cocos Island',
      'flag': '/public/images/flags/cc.svg'
  },
  'CO': {
      'en_short_name': 'Colombia',
      'nationality': 'Colombian',
      'flag': '/public/images/flags/co.svg'
  },
  'KM': {
      'en_short_name': 'Comoros',
      'nationality': 'Comorian',
      'flag': '/public/images/flags/km.svg'
  },
  'CG': {
      'en_short_name': 'Congo',
      'nationality': 'Congolese',
      'flag': '/public/images/flags/cg.svg'
  },
  'CD': {
      'en_short_name': 'Congo',
      'nationality': 'Congolese',
      'flag': '/public/images/flags/cd.svg'
  },
  'CK': {
      'en_short_name': 'Cook Islands',
      'nationality': 'Cook Island',
      'flag': '/public/images/flags/ck.svg'
  },
  'CR': {
      'en_short_name': 'Costa Rica',
      'nationality': 'Costa Rican',
      'flag': '/public/images/flags/cr.svg'
  },
  'CI': {
      'en_short_name': "Côte d'Ivoire",
      'nationality': 'Ivorian',
      'flag': '/public/images/flags/ci.svg'
  },
  'HR': {
      'en_short_name': 'Croatia',
      'nationality': 'Croatian',
      'flag': '/public/images/flags/hr.svg'
  },
  'CU': {
      'en_short_name': 'Cuba',
      'nationality': 'Cuban',
      'flag': '/public/images/flags/cu.svg'
  },
  'CW': {
      'en_short_name': 'Curaçao',
      'nationality': 'Curaçaoan',
      'flag': '/public/images/flags/cw.svg'
  },
  'CY': {
      'en_short_name': 'Cyprus',
      'nationality': 'Cypriot',
      'flag': '/public/images/flags/cy.svg'
  },
  'CZ': {
      'en_short_name': 'Czech Republic',
      'nationality': 'Czech',
      'flag': '/public/images/flags/cz.svg'
  },
  'DK': {
      'en_short_name': 'Denmark',
      'nationality': 'Danish',
      'flag': '/public/images/flags/dk.svg'
  },
  'DJ': {
      'en_short_name': 'Djibouti',
      'nationality': 'Djiboutian',
      'flag': '/public/images/flags/dj.svg'
  },
  'DM': {
      'en_short_name': 'Dominica',
      'nationality': 'Dominican',
      'flag': '/public/images/flags/dm.svg'
  },
  'DO': {
      'en_short_name': 'Dominican Republic',
      'nationality': 'Dominican',
      'flag': '/public/images/flags/do.svg'
  },
  'EC': {
      'en_short_name': 'Ecuador',
      'nationality': 'Ecuadorian',
      'flag': '/public/images/flags/ec.svg'
  },
  'EG': {
      'en_short_name': 'Egypt',
      'nationality': 'Egyptian',
      'flag': '/public/images/flags/eg.svg'
  },
  'SV': {
      'en_short_name': 'El Salvador',
      'nationality': 'Salvadoran',
      'flag': '/public/images/flags/sv.svg'
  },
  'GQ': {
      'en_short_name': 'Equatorial Guinea',
      'nationality': 'Equatoguinean',
      'flag': '/public/images/flags/gq.svg'
  },
  'ER': {
      'en_short_name': 'Eritrea',
      'nationality': 'Eritrean',
      'flag': '/public/images/flags/er.svg'
  },
  'EE': {
      'en_short_name': 'Estonia',
      'nationality': 'Estonian',
      'flag': '/public/images/flags/ee.svg'
  },
  'ET': {
      'en_short_name': 'Ethiopia',
      'nationality': 'Ethiopian',
      'flag': '/public/images/flags/et.svg'
  },
  'FK': {
      'en_short_name': 'Falkland Islands (Malvinas)',
      'nationality': 'Falkland Island',
      'flag': '/public/images/flags/fk.svg'
  },
  'FO': {
      'en_short_name': 'Faroe Islands',
      'nationality': 'Faroese',
      'flag': '/public/images/flags/fo.svg'
  },
  'FJ': {
      'en_short_name': 'Fiji',
      'nationality': 'Fijian',
      'flag': '/public/images/flags/fj.svg'
  },
  'FI': {
      'en_short_name': 'Finland',
      'nationality': 'Finnish',
      'flag': '/public/images/flags/fi.svg'
  },
  'FR': {
      'en_short_name': 'France',
      'nationality': 'French',
      'flag': '/public/images/flags/fr.svg'
  },
  'GF': {
      'en_short_name': 'French Guiana',
      'nationality': 'French Guianese',
      'flag': '/public/images/flags/gf.svg'
  },
  'PF': {
      'en_short_name': 'French Polynesia',
      'nationality': 'French Polynesian',
      'flag': '/public/images/flags/pf.svg'
  },
  'TF': {
      'en_short_name': 'French Southern Territories',
      'nationality': 'French Southern Territories',
      'flag': '/public/images/flags/tf.svg'
  },
  'GA': {
      'en_short_name': 'Gabon',
      'nationality': 'Gabonese',
      'flag': '/public/images/flags/ga.svg'
  },
  'GM': {
      'en_short_name': 'Gambia',
      'nationality': 'Gambian',
      'flag': '/public/images/flags/gm.svg'
  },
  'GE': {
      'en_short_name': 'Georgia',
      'nationality': 'Georgian',
      'flag': '/public/images/flags/ge.svg'
  },
  'DE': {
      'en_short_name': 'Germany',
      'nationality': 'German',
      'flag': '/public/images/flags/de.svg'
  },
  'GH': {
      'en_short_name': 'Ghana',
      'nationality': 'Ghanaian',
      'flag': '/public/images/flags/gh.svg'
  },
  'GI': {
      'en_short_name': 'Gibraltar',
      'nationality': 'Gibraltar',
      'flag': '/public/images/flags/gi.svg'
  },
  'GR': {
      'en_short_name': 'Greece',
      'nationality': 'Greek',
      'flag': '/public/images/flags/gr.svg'
  },
  'GL': {
      'en_short_name': 'Greenland',
      'nationality': 'Greenlandic',
      'flag': '/public/images/flags/gl.svg'
  },
  'GD': {
      'en_short_name': 'Grenada',
      'nationality': 'Grenadian',
      'flag': '/public/images/flags/gd.svg'
  },
  'GP': {
      'en_short_name': 'Guadeloupe',
      'nationality': 'Guadeloupe',
      'flag': '/public/images/flags/gp.svg'
  },
  'GU': {
      'en_short_name': 'Guam',
      'nationality': 'Guamanian',
      'flag': '/public/images/flags/gu.svg'
  },
  'GT': {
      'en_short_name': 'Guatemala',
      'nationality': 'Guatemalan',
      'flag': '/public/images/flags/gt.svg'
  },
  'GG': {
      'en_short_name': 'Guernsey',
      'nationality': 'Channel Island',
      'flag': '/public/images/flags/gg.svg'
  },
  'GN': {
      'en_short_name': 'Guinea',
      'nationality': 'Guinean',
      'flag': '/public/images/flags/gn.svg'
  },
  'GW': {
      'en_short_name': 'Guinea-Bissau',
      'nationality': 'Bissau-Guinean',
      'flag': '/public/images/flags/gw.svg'
  },
  'GY': {
      'en_short_name': 'Guyana',
      'nationality': 'Guyanese',
      'flag': '/public/images/flags/gy.svg'
  },
  'HT': {
      'en_short_name': 'Haiti',
      'nationality': 'Haitian',
      'flag': '/public/images/flags/ht.svg'
  },
  'HM': {
      'en_short_name': 'Heard Island and McDonald Islands',
      'nationality': 'Heard Island or McDonald Islands',
      'flag': '/public/images/flags/hm.svg'
  },
  'VA': {
      'en_short_name': 'Vatican City State',
      'nationality': 'Vatican',
      'flag': '/public/images/flags/va.svg'
  },
  'HN': {
      'en_short_name': 'Honduras',
      'nationality': 'Honduran',
      'flag': '/public/images/flags/hn.svg'
  },
  'HK': {
      'en_short_name': 'Hong Kong',
      'nationality': 'Hong Kong',
      'flag': '/public/images/flags/hk.svg'
  },
  'HU': {
      'en_short_name': 'Hungary',
      'nationality': 'Hungarian',
      'flag': '/public/images/flags/hu.svg'
  },
  'IS': {
      'en_short_name': 'Iceland',
      'nationality': 'Icelandic',
      'flag': '/public/images/flags/is.svg'
  },
  'IN': {
      'en_short_name': 'India',
      'nationality': 'Indian',
      'flag': '/public/images/flags/in.svg'
  },
  'ID': {
      'en_short_name': 'Indonesia',
      'nationality': 'Indonesian',
      'flag': '/public/images/flags/id.svg'
  },
  'IR': {
      'en_short_name': 'Iran',
      'nationality': 'Iranian',
      'flag': '/public/images/flags/ir.svg'
  },
  'IQ': {
      'en_short_name': 'Iraq',
      'nationality': 'Iraqi',
      'flag': '/public/images/flags/iq.svg'
  },
  'IE': {
      'en_short_name': 'Ireland',
      'nationality': 'Irish',
      'flag': '/public/images/flags/ie.svg'
  },
  'IM': {
      'en_short_name': 'Isle of Man',
      'nationality': 'Manx',
      'flag': '/public/images/flags/im.svg'
  },
  'IL': {
      'en_short_name': 'Israel',
      'nationality': 'Israeli',
      'flag': '/public/images/flags/il.svg'
  },
  'IT': {
      'en_short_name': 'Italy',
      'nationality': 'Italian',
      'flag': '/public/images/flags/it.svg'
  },
  'JM': {
      'en_short_name': 'Jamaica',
      'nationality': 'Jamaican',
      'flag': '/public/images/flags/jm.svg'
  },
  'JP': {
      'en_short_name': 'Japan',
      'nationality': 'Japanese',
      'flag': '/public/images/flags/jp.svg'
  },
  'JE': {
      'en_short_name': 'Jersey',
      'nationality': 'Channel Island',
      'flag': '/public/images/flags/je.svg'
  },
  'JO': {
      'en_short_name': 'Jordan',
      'nationality': 'Jordanian',
      'flag': '/public/images/flags/jo.svg'
  },
  'KZ': {
      'en_short_name': 'Kazakhstan',
      'nationality': 'Kazakhstani',
      'flag': '/public/images/flags/kz.svg'
  },
  'KE': {
      'en_short_name': 'Kenya',
      'nationality': 'Kenyan',
      'flag': '/public/images/flags/ke.svg'
  },
  'KI': {
      'en_short_name': 'Kiribati',
      'nationality': 'I-Kiribati',
      'flag': '/public/images/flags/ki.svg'
  },
  'KP': {
      'en_short_name': "Korea (Democratic People's Republic of)",
      'nationality': 'North Korean',
      'flag': '/public/images/flags/kp.svg'
  },
  'KR': {
      'en_short_name': 'Korea (Republic of)',
      'nationality': 'South Korean',
      'flag': '/public/images/flags/kr.svg'
  },
  'KW': {
      'en_short_name': 'Kuwait',
      'nationality': 'Kuwaiti',
      'flag': '/public/images/flags/kw.svg'
  },
  'KG': {
      'en_short_name': 'Kyrgyzstan',
      'nationality': 'Kyrgyzstani',
      'flag': '/public/images/flags/kg.svg'
  },
  'LA': {
      'en_short_name': "Lao People's Democratic Republic",
      'nationality': 'Laotian',
      'flag': '/public/images/flags/la.svg'
  },
  'LV': {
      'en_short_name': 'Latvia',
      'nationality': 'Latvian',
      'flag': '/public/images/flags/lv.svg'
  },
  'LB': {
      'en_short_name': 'Lebanon',
      'nationality': 'Lebanese',
      'flag': '/public/images/flags/lb.svg'
  },
  'LS': {
      'en_short_name': 'Lesotho',
      'nationality': 'Basotho',
      'flag': '/public/images/flags/ls.svg'
  },
  'LR': {
      'en_short_name': 'Liberia',
      'nationality': 'Liberian',
      'flag': '/public/images/flags/lr.svg'
  },
  'LY': {
      'en_short_name': 'Libya',
      'nationality': 'Libyan',
      'flag': '/public/images/flags/ly.svg'
  },
  'LI': {
      'en_short_name': 'Liechtenstein',
      'nationality': 'Liechtenstein',
      'flag': '/public/images/flags/li.svg'
  },
  'LT': {
      'en_short_name': 'Lithuania',
      'nationality': 'Lithuanian',
      'flag': '/public/images/flags/lt.svg'
  },
  'LU': {
      'en_short_name': 'Luxembourg',
      'nationality': 'Luxembourgish',
      'flag': '/public/images/flags/lu.svg'
  },
  'MO': {
      'en_short_name': 'Macao',
      'nationality': 'Macanese',
      'flag': '/public/images/flags/mo.svg'
  },
  'MK': {
      'en_short_name': 'Macedonia',
      'nationality': 'Macedonian',
      'flag': '/public/images/flags/mk.svg'
  },
  'MG': {
      'en_short_name': 'Madagascar',
      'nationality': 'Malagasy',
      'flag': '/public/images/flags/mg.svg'
  },
  'MW': {
      'en_short_name': 'Malawi',
      'nationality': 'Malawian',
      'flag': '/public/images/flags/mw.svg'
  },
  'MY': {
      'en_short_name': 'Malaysia',
      'nationality': 'Malaysian',
      'flag': '/public/images/flags/my.svg'
  },
  'MV': {
      'en_short_name': 'Maldives',
      'nationality': 'Maldivian',
      'flag': '/public/images/flags/mv.svg'
  },
  'ML': {
      'en_short_name': 'Mali',
      'nationality': 'Malinese',
      'flag': '/public/images/flags/ml.svg'
  },
  'MT': {
      'en_short_name': 'Malta',
      'nationality': 'Maltese',
      'flag': '/public/images/flags/mt.svg'
  },
  'MH': {
      'en_short_name': 'Marshall Islands',
      'nationality': 'Marshallese',
      'flag': '/public/images/flags/mh.svg'
  },
  'MQ': {
      'en_short_name': 'Martinique',
      'nationality': 'Martinican',
      'flag': '/public/images/flags/mq.svg'
  },
  'MR': {
      'en_short_name': 'Mauritania',
      'nationality': 'Mauritanian',
      'flag': '/public/images/flags/mr.svg'
  },
  'MU': {
      'en_short_name': 'Mauritius',
      'nationality': 'Mauritian',
      'flag': '/public/images/flags/mu.svg'
  },
  'YT': {
      'en_short_name': 'Mayotte',
      'nationality': 'Mahoran',
      'flag': '/public/images/flags/yt.svg'
  },
  'MX': {
      'en_short_name': 'Mexico',
      'nationality': 'Mexican',
      'flag': '/public/images/flags/mx.svg'
  },
  'FM': {
      'en_short_name': 'Micronesia',
      'nationality': 'Micronesian',
      'flag': '/public/images/flags/fm.svg'
  },
  'MD': {
      'en_short_name': 'Moldova',
      'nationality': 'Moldovan',
      'flag': '/public/images/flags/md.svg'
  },
  'MC': {
      'en_short_name': 'Monaco',
      'nationality': 'Monacan',
      'flag': '/public/images/flags/mc.svg'
  },
  'MN': {
      'en_short_name': 'Mongolia',
      'nationality': 'Mongolian',
      'flag': '/public/images/flags/mn.svg'
  },
  'ME': {
      'en_short_name': 'Montenegro',
      'nationality': 'Montenegrin',
      'flag': '/public/images/flags/me.svg'
  },
  'MS': {
      'en_short_name': 'Montserrat',
      'nationality': 'Montserratian',
      'flag': '/public/images/flags/ms.svg'
  },
  'MA': {
      'en_short_name': 'Morocco',
      'nationality': 'Moroccan',
      'flag': '/public/images/flags/ma.svg'
  },
  'MZ': {
      'en_short_name': 'Mozambique',
      'nationality': 'Mozambican',
      'flag': '/public/images/flags/mz.svg'
  },
  'MM': {
      'en_short_name': 'Myanmar',
      'nationality': 'Burmese',
      'flag': '/public/images/flags/mm.svg'
  },
  'NA': {
      'en_short_name': 'Namibia',
      'nationality': 'Namibian',
      'flag': '/public/images/flags/na.svg'
  },
  'NR': {
      'en_short_name': 'Nauru',
      'nationality': 'Nauruan',
      'flag': '/public/images/flags/nr.svg'
  },
  'NP': {
      'en_short_name': 'Nepal',
      'nationality': 'Nepalese',
      'flag': '/public/images/flags/np.svg'
  },
  'NL': {
      'en_short_name': 'Netherlands',
      'nationality': 'Dutch',
      'flag': '/public/images/flags/nl.svg'
  },
  'NC': {
      'en_short_name': 'New Caledonia',
      'nationality': 'New Caledonian',
      'flag': '/public/images/flags/nc.svg'
  },
  'NZ': {
      'en_short_name': 'New Zealand',
      'nationality': 'New Zealandian',
      'flag': '/public/images/flags/nz.svg'
  },
  'NI': {
      'en_short_name': 'Nicaragua',
      'nationality': 'Nicaraguan',
      'flag': '/public/images/flags/ni.svg'
  },
  'NE': {
      'en_short_name': 'Niger',
      'nationality': 'Nigerien',
      'flag': '/public/images/flags/ne.svg'
  },
  'NG': {
      'en_short_name': 'Nigeria',
      'nationality': 'Nigerian',
      'flag': '/public/images/flags/ng.svg'
  },
  'NU': {
      'en_short_name': 'Niue',
      'nationality': 'Niuean',
      'flag': '/public/images/flags/nu.svg'
  },
  'NF': {
      'en_short_name': 'Norfolk Island',
      'nationality': 'Norfolk Island',
      'flag': '/public/images/flags/nf.svg'
  },
  'MP': {
      'en_short_name': 'Northern Mariana Islands',
      'nationality': 'Northern Marianan',
      'flag': '/public/images/flags/mp.svg'
  },
  'NO': {
      'en_short_name': 'Norway',
      'nationality': 'Norwegian',
      'flag': '/public/images/flags/no.svg'
  },
  'OM': {
      'en_short_name': 'Oman',
      'nationality': 'Omani',
      'flag': '/public/images/flags/om.svg'
  },
  'PK': {
      'en_short_name': 'Pakistan',
      'nationality': 'Pakistani',
      'flag': '/public/images/flags/pk.svg'
  },
  'PW': {
      'en_short_name': 'Palau',
      'nationality': 'Palauan',
      'flag': '/public/images/flags/pw.svg'
  },
  'PS': {
      'en_short_name': 'Palestine, State of',
      'nationality': 'Palestinian',
      'flag': '/public/images/flags/ps.svg'
  },
  'PA': {
      'en_short_name': 'Panama',
      'nationality': 'Panamanian',
      'flag': '/public/images/flags/pa.svg'
  },
  'PG': {
      'en_short_name': 'Papua New Guinea',
      'nationality': 'Papuan',
      'flag': '/public/images/flags/pg.svg'
  },
  'PY': {
      'en_short_name': 'Paraguay',
      'nationality': 'Paraguayan',
      'flag': '/public/images/flags/py.svg'
  },
  'PE': {
      'en_short_name': 'Peru',
      'nationality': 'Peruvian',
      'flag': '/public/images/flags/pe.svg'
  },
  'PH': {
      'en_short_name': 'Philippines',
      'nationality': 'Filipino',
      'flag': '/public/images/flags/ph.svg'
  },
  'PN': {
      'en_short_name': 'Pitcairn',
      'nationality': 'Pitcairn Island',
      'flag': '/public/images/flags/pn.svg'
  },
  'PL': {
      'en_short_name': 'Poland',
      'nationality': 'Polish',
      'flag': '/public/images/flags/pl.svg'
  },
  'PT': {
      'en_short_name': 'Portugal',
      'nationality': 'Portuguese',
      'flag': '/public/images/flags/pt.svg'
  },
  'PR': {
      'en_short_name': 'Puerto Rico',
      'nationality': 'Puerto Rican',
      'flag': '/public/images/flags/pr.svg'
  },
  'QA': {
      'en_short_name': 'Qatar',
      'nationality': 'Qatari',
      'flag': '/public/images/flags/qa.svg'
  },
  'RE': {
      'en_short_name': 'Réunion',
      'nationality': 'Réunionnais',
      'flag': '/public/images/flags/re.svg'
  },
  'RO': {
      'en_short_name': 'Romania',
      'nationality': 'Romanian',
      'flag': '/public/images/flags/ro.svg'
  },
  'RU': {
      'en_short_name': 'Russian Federation',
      'nationality': 'Russian',
      'flag': '/public/images/flags/ru.svg'
  },
  'RW': {
      'en_short_name': 'Rwanda',
      'nationality': 'Rwandan',
      'flag': '/public/images/flags/rw.svg'
  },
  'BL': {
      'en_short_name': 'Saint Barthélemy',
      'nationality': 'Barthélemois',
      'flag': '/public/images/flags/bl.svg'
  },
  'SH': {
      'en_short_name': 'Saint Helena, Ascension and Tristan da Cunha',
      'nationality': 'Saint Helenian',
      'flag': '/public/images/flags/sh.svg'
  },
  'KN': {
      'en_short_name': 'Saint Kitts and Nevis',
      'nationality': 'Kittitian or Nevisian',
      'flag': '/public/images/flags/kn.svg'
  },
  'LC': {
      'en_short_name': 'Saint Lucia',
      'nationality': 'Saint Lucian',
      'flag': '/public/images/flags/lc.svg'
  },
  'MF': {
      'en_short_name': 'Saint Martin (French part)',
      'nationality': 'Saint-Martinoise',
      'flag': '/public/images/flags/mf.svg'
  },
  'PM': {
      'en_short_name': 'Saint Pierre and Miquelon',
      'nationality': 'Saint-Pierrais or Miquelonnais',
      'flag': '/public/images/flags/pm.svg'
  },
  'VC': {
      'en_short_name': 'Saint Vincent and the Grenadines',
      'nationality': 'Vincentian',
      'flag': '/public/images/flags/vc.svg'
  },
  'WS': {
      'en_short_name': 'Samoa',
      'nationality': 'Samoan',
      'flag': '/public/images/flags/ws.svg'
  },
  'SM': {
      'en_short_name': 'San Marino',
      'nationality': 'Sammarinese',
      'flag': '/public/images/flags/sm.svg'
  },
  'ST': {
      'en_short_name': 'Sao Tome and Principe',
      'nationality': 'São Toméan',
      'flag': '/public/images/flags/st.svg'
  },
  'SA': {
      'en_short_name': 'Saudi Arabia',
      'nationality': 'Saudi',
      'flag': '/public/images/flags/sa.svg'
  },
  'SN': {
      'en_short_name': 'Senegal',
      'nationality': 'Senegalese',
      'flag': '/public/images/flags/sn.svg'
  },
  'RS': {
      'en_short_name': 'Serbia',
      'nationality': 'Serbian',
      'flag': '/public/images/flags/rs.svg'
  },
  'SC': {
      'en_short_name': 'Seychelles',
      'nationality': 'Seychellois',
      'flag': '/public/images/flags/sc.svg'
  },
  'SL': {
      'en_short_name': 'Sierra Leone',
      'nationality': 'Sierra Leonean',
      'flag': '/public/images/flags/sl.svg'
  },
  'SG': {
      'en_short_name': 'Singapore',
      'nationality': 'Singaporean',
      'flag': '/public/images/flags/sg.svg'
  },
  'SX': {
      'en_short_name': 'Sint Maarten (Dutch part)',
      'nationality': 'Sint Maarten',
      'flag': '/public/images/flags/sx.svg'
  },
  'SK': {
      'en_short_name': 'Slovakia',
      'nationality': 'Slovak',
      'flag': '/public/images/flags/sk.svg'
  },
  'SI': {
      'en_short_name': 'Slovenia',
      'nationality': 'Slovenian',
      'flag': '/public/images/flags/si.svg'
  },
  'SB': {
      'en_short_name': 'Solomon Islands',
      'nationality': 'Solomon Island',
      'flag': '/public/images/flags/sb.svg'
  },
  'SO': {
      'en_short_name': 'Somalia',
      'nationality': 'Somalian',
      'flag': '/public/images/flags/so.svg'
  },
  'ZA': {
      'en_short_name': 'South Africa',
      'nationality': 'South African',
      'flag': '/public/images/flags/za.svg'
  },
  'GS': {
      'en_short_name': 'South Georgia and the South Sandwich Islands',
      'nationality': 'South Georgian',
      'flag': '/public/images/flags/gs.svg'
  },
  'SS': {
      'en_short_name': 'South Sudan',
      'nationality': 'South Sudanese',
      'flag': '/public/images/flags/ss.svg'
  },
  'ES': {
      'en_short_name': 'Spain',
      'nationality': 'Spanish',
      'flag': '/public/images/flags/es.svg'
  },
  'LK': {
      'en_short_name': 'Sri Lanka',
      'nationality': 'Sri Lankan',
      'flag': '/public/images/flags/lk.svg'
  },
  'SD': {
      'en_short_name': 'Sudan',
      'nationality': 'Sudanese',
      'flag': '/public/images/flags/sd.svg'
  },
  'SR': {
      'en_short_name': 'Suriname',
      'nationality': 'Surinamese',
      'flag': '/public/images/flags/sr.svg'
  },
  'SJ': {
      'en_short_name': 'Svalbard and Jan Mayen',
      'nationality': 'Svalbard',
      'flag': '/public/images/flags/sj.svg'
  },
  'SZ': {
      'en_short_name': 'Swaziland',
      'nationality': 'Swazi',
      'flag': '/public/images/flags/sz.svg'
  },
  'SE': {
      'en_short_name': 'Sweden',
      'nationality': 'Swedish',
      'flag': '/public/images/flags/se.svg'
  },
  'CH': {
      'en_short_name': 'Switzerland',
      'nationality': 'Swiss',
      'flag': '/public/images/flags/ch.svg'
  },
  'SY': {
      'en_short_name': 'Syrian Arab Republic',
      'nationality': 'Syrian',
      'flag': '/public/images/flags/sy.svg'
  },
  'TW': {
      'en_short_name': 'Taiwan',
      'nationality': 'Taiwanese',
      'flag': '/public/images/flags/tw.svg'
  },
  'TJ': {
      'en_short_name': 'Tajikistan',
      'nationality': 'Tajikistani',
      'flag': '/public/images/flags/tj.svg'
  },
  'TZ': {
      'en_short_name': 'Tanzania, United Republic of',
      'nationality': 'Tanzanian',
      'flag': '/public/images/flags/tz.svg'
  },
  'TH': {
      'en_short_name': 'Thailand',
      'nationality': 'Thai',
      'flag': '/public/images/flags/th.svg'
  },
  'TL': {
      'en_short_name': 'Timor-Leste',
      'nationality': 'Timorese',
      'flag': '/public/images/flags/tl.svg'
  },
  'TG': {
      'en_short_name': 'Togo',
      'nationality': 'Togolese',
      'flag': '/public/images/flags/tg.svg'
  },
  'TK': {
      'en_short_name': 'Tokelau',
      'nationality': 'Tokelauan',
      'flag': '/public/images/flags/tk.svg'
  },
  'TO': {
      'en_short_name': 'Tonga',
      'nationality': 'Tongan',
      'flag': '/public/images/flags/to.svg'
  },
  'TT': {
      'en_short_name': 'Trinidad and Tobago',
      'nationality': 'Trinidadian & Tobagonian',
      'flag': '/public/images/flags/tt.svg'
  },
  'TN': {
      'en_short_name': 'Tunisia',
      'nationality': 'Tunisian',
      'flag': '/public/images/flags/tn.svg'
  },
  'TR': {
      'en_short_name': 'Turkey',
      'nationality': 'Turkish',
      'flag': '/public/images/flags/tr.svg'
  },
  'TM': {
      'en_short_name': 'Turkmenistan',
      'nationality': 'Turkmen',
      'flag': '/public/images/flags/tm.svg'
  },
  'TC': {
      'en_short_name': 'Turks and Caicos Islands',
      'nationality': 'Turks and Caicos Island',
      'flag': '/public/images/flags/tc.svg'
  },
  'TV': {
      'en_short_name': 'Tuvalu',
      'nationality': 'Tuvaluan',
      'flag': '/public/images/flags/tv.svg'
  },
  'UG': {
      'en_short_name': 'Uganda',
      'nationality': 'Ugandan',
      'flag': '/public/images/flags/ug.svg'
  },
  'UA': {
      'en_short_name': 'Ukraine',
      'nationality': 'Ukrainian',
      'flag': '/public/images/flags/ua.svg'
  },
  'AE': {
      'en_short_name': 'United Arab Emirates',
      'nationality': 'Emirian',
      'flag': '/public/images/flags/ae.svg'
  },
  'GB': {
      'en_short_name': 'United Kingdom of Great Britain and Northern Ireland',
      'nationality': 'British',
      'flag': '/public/images/flags/gb.svg'
  },
  'UM': {
      'en_short_name': 'United States Minor Outlying Islands',
      'nationality': 'American',
      'flag': '/public/images/flags/um.svg'
  },
  'US': {
      'en_short_name': 'United States of America',
      'nationality': 'American',
      'flag': '/public/images/flags/us.svg'
  },
  'UY': {
      'en_short_name': 'Uruguay',
      'nationality': 'Uruguayan',
      'flag': '/public/images/flags/uy.svg'
  },
  'UZ': {
      'en_short_name': 'Uzbekistan',
      'nationality': 'Uzbek',
      'flag': '/public/images/flags/uz.svg'
  },
  'VU': {
      'en_short_name': 'Vanuatu',
      'nationality': 'Vanuatuan',
      'flag': '/public/images/flags/vu.svg'
  },
  'VE': {
      'en_short_name': 'Venezuela (Bolivarian Republic of)',
      'nationality': 'Venezuelan',
      'flag': '/public/images/flags/ve.svg'
  },
  'VN': {
      'en_short_name': 'Vietnam',
      'nationality': 'Vietnamese',
      'flag': '/public/images/flags/vn.svg'
  },
  'VG': {
      'en_short_name': 'Virgin Islands (British)',
      'nationality': 'British Virgin Island',
      'flag': '/public/images/flags/vg.svg'
  },
  'VI': {
      'en_short_name': 'Virgin Islands (U.S.)',
      'nationality': 'U.S. Virgin Island',
      'flag': '/public/images/flags/vi.svg'
  },
  'WF': {
      'en_short_name': 'Wallis and Futuna',
      'nationality': 'Wallisian or Futunan',
      'flag': '/public/images/flags/wf.svg'
  },
  'EH': {
      'en_short_name': 'Western Sahara',
      'nationality': 'Sahrawian',
      'flag': '/public/images/flags/eh.svg'
  },
  'YE': {
      'en_short_name': 'Yemen',
      'nationality': 'Yemeni',
      'flag': '/public/images/flags/ye.svg'
  },
  'ZM': {
      'en_short_name': 'Zambia',
      'nationality': 'Zambian',
      'flag': '/public/images/flags/zm.svg'
  },
  'ZW': {
      'en_short_name': 'Zimbabwe',
      'nationality': 'Zimbabwean',
      'flag': '/public/images/flags/zw.svg'
  }
}

// Create class for countries
function countryName(countryCode) {
  return countries[countryCode.toUpperCase()].en_short_name;
}

function countryAdjective(countryCode) {
  return countries[countryCode.toUpperCase()].nationality
}

function countryFlag(countryCode) {
  return countries[countryCode.toUpperCase()].flag
}

function countryFull(countryCode) {
  return countries[countryCode.toUpperCase()]
}


