// each order should provide only toC and fromC functions
// as we're converting each to Celsius and then convert the rest
const scales = {
  Fahrenheit: {
    toC: (Tf) => (5 / 9) * (Tf - 32),
    fromC: (Tc) => 32 + (9 / 5) * Tc,
  },
  Réaumur: {
    toC: (Tr) => Tr * (5 / 4),
    fromC: (Tc) => Tc * (4 / 5),
  },
  Rømer: {
    toC: (Tr) => (Tr - 7.5) * (40 / 21),
    fromC: (Tc) => Tc * (21 / 40) + 7.5,
  },
  Delisle: {
    toC: (Td) => 100 - Td * (2 / 3),
    fromC: (Tc) => (100 - Tc) * (3 / 2),
  },
  Kelvin: {
    toC: (Tk) => Tk - 273.15,
    fromC: (Tc) => 273.15 + Tc,
  },
  Newton: {
    toC: (Tn) => Tn * (100 / 33),
    fromC: (Tc) => Tc * (33 / 100),
  },
  Rankine: {
    toC: (Tr) => scales.Kelvin.toC(Tr * (5 / 9)),
    fromC: (Tc) => scales.Kelvin.fromC(Tc) * (9 / 5),
  },
};

const scalesArray = ['Celsius', ...Object.keys(scales)];

const descriptions = {
  Fahrenheit:
    "The Fahrenheit scale is a temperature scale based on one proposed in 1724 by German physicist Daniel Gabriel Fahrenheit (1686–1736). It uses the degree Fahrenheit (symbol: °F) as the unit. Several accounts of how he originally defined his scale exist. The lower defining point, 0 °F, was established as the freezing temperature of a solution of brine made from equal parts of ice, water and a salt (ammonium chloride). Further limits were established as the melting point of ice (32 °F) and his best estimate of the average human body temperature (96 °F, about 2.6 °F less than the modern value due to a later redefinition of the scale). The scale is now usually defined by two fixed points: the temperature at which water freezes into ice is defined as 32 °F, and the boiling point of water is defined to be 212 °F, a 180 °F separation, as defined at sea level and standard atmospheric pressure.\n" +
    "At the end of the 2010s, Fahrenheit was used as the official temperature scale only in the United States (including its unincorporated territories), its freely associated states in the Western Pacific (Palau, the Federated States of Micronesia and the Marshall Islands), the Cayman Islands, and Liberia. Antigua and Barbuda and other islands which use the same meteorological service, such as Saint Kitts and Nevis, the Bahamas, and Belize use Fahrenheit and Celsius. All other countries in the world officially now use the Celsius scale, named after Swedish astronomer Anders Celsius. A handful of British Overseas Territories still use Fahrenheit alongside Celsius including the British Virgin Islands, Montserrat, Anguilla, and Bermuda.",
  Kelvin:
    "The kelvin is the base unit of temperature in the International System of Units (SI), having the unit symbol K. It is named after the Belfast-born, Glasgow University engineer and physicist William Thomson, 1st Baron Kelvin (1824–1907).\n" +
    "The kelvin is now defined by fixing the numerical value of the Boltzmann constant k to 1.380 649×10−23 J⋅K−1. This unit is equal to kg⋅m2⋅s−2⋅K−1, where the kilogram, metre and second are defined in terms of the Planck constant, the speed of light, and the duration of the caesium-133 ground-state hyperfine transition. Thus, this definition depends only on universal constants, and not on any physical artifacts as practiced previously, such as the International Prototype of the Kilogram, whose mass diverged over time from the original value.\n" +
    "One kelvin is equal to a change in the thermodynamic temperature T that results in a change of thermal energy kT by 1.380 649×10−23 J.The Kelvin scale fulfills Thomson's requirements as an absolute thermodynamic temperature scale. It uses absolute zero as its null point.\n" +
    "Unlike the degree Fahrenheit and degree Celsius, the kelvin is not referred to or written as a degree. The kelvin is the primary unit of temperature measurement in the physical sciences, but is often used in conjunction with the degree Celsius, which has the same magnitude.",
  Réaumur:
    'The Réaumur scale (French pronunciation: ​[ʁeomy(ː)ʁ]; °Ré, °Re, °r), also known as the "octogesimal division", is a temperature scale for which the freezing and boiling points of water are defined as 0 and 80 degrees respectively.  The scale is named for René Antoine Ferchault de Réaumur, who first proposed a similar scale in 1730.',
  Rømer:
    "The Rømer scale (Danish pronunciation: [ˈʁœˀmɐ]; notated as °Rø), also known as Romer or Roemer, is a temperature scale named after the Danish astronomer Ole Christensen Rømer, who proposed it in 1701. It is based on the freezing point of pure water being 7.5 degrees and the boiling point of water as 60 degrees.\n" +
    "\n",
  Delisle:
    "The Delisle scale (°D) is a temperature scale invented in 1732 by the French astronomer Joseph-Nicolas Delisle (1688–1768). Delisle was the author of Mémoires pour servir à l'histoire et aux progrès de l'Astronomie, de la Géographie et de la Physique (1738).",
  Newton:
    "The Newton scale is a temperature scale devised by Isaac Newton in 1701.\n" +
    'He called his device a "thermometer", but he did not use the term "temperature", speaking of "degrees of heat" (gradus caloris) instead.\n' +
    "Newton's publication represents the first attempt to introduce an objective way of measuring (what would come to be called) temperature (alongside the Rømer scale published at nearly the same time).\n" +
    "Newton likely developed his scale for practical use rather than  for a theoretical interest in thermodynamics; he had been appointed Warden of the Mint in 1695, and Master of the Mint in 1699, and his interest in the melting points of metals are likely inspired by his duties in connection with the Royal Mint.\n" +
    'Newton used linseed oil as thermometric material  and measured its change of volume against his reference points. He set as 0 on his scale "the heat of air in winter at which water begins to freeze" (Calor aeris hyberni ubi aqua incipit gelu rigescere), reminiscent of the standard of the modern Celsius scale (i.e. 0 °N = 0 °C), but he has no single second reference point; he does give the "heat at which water begins to boil" as 33, but this is not a defining reference; the values for body temperature and the freezing and boiling point of water suggest a conversion factor between the Newton and the Celsius scale of between about 3.08 (12 °N = 37 °C) and 3.03 (33 °N = 100 °C) but since the objectively verifiable reference points given result in irreconcilable data (especially for high temperatures), no unambiguous "conversion" between the scales is possible.The linseed thermometer could be used up to the melting point of tin. For higher temperatures, Newton used a "sufficiently thick piece of iron" that was heated until red-hot and then exposed to the wind. On this piece of iron, samples of metals and alloys were placed, which melted and then again solidified on cooling. Newton then determined the "degrees of heat" of these samples based on the solidification times, and tied this scale to the linseed one by measuring the melting point of tin in both systems.\n' +
    "This second system of measurement led Newton to derive his law of convective heat transfer, also known as Newton's law of cooling.\n" +
    "In his publication, Newton gives 18 reference points (in addition to a range of meteorological air temperatures), which he labels by two systems, one in  arithmetic progression and the other in geometric progression, as follows:",
  Rankine:
    "The Rankine scale is an absolute scale of thermodynamic temperature named after the Glasgow University engineer and physicist William John Macquorn Rankine, who proposed it in 1859 (the Kelvin scale was first proposed in 1848).  It may be used in engineering systems where heat computations are done using degrees Fahrenheit.\n" +
    "The symbol for degrees Rankine is °R (or °Ra if necessary to distinguish it from the Rømer and Réaumur scales). By analogy with Kelvin, some authors term the unit Rankine, omitting the degree symbol. Zero on both the Kelvin and Rankine scales is absolute zero, but a temperature difference of one Rankine degree is defined as equal to one Fahrenheit degree, rather than the Celsius degree used on the Kelvin scale. Thus, a temperature of 0 K (−273.15 °C; −459.67 °F) is equal to 0 °R, and a temperature of −458.67 °F equal to 1 °R.\n" +
    "Some important temperatures relating the Rankine scale to other temperature scales are shown in the table below.",
  Celsius:
    "The Celsius scale, also known as the centigrade scale, is a temperature scale. As an SI derived unit, it is used worldwide. In the United States, the Bahamas, Belize, the Cayman Islands and Liberia, Fahrenheit remains the preferred scale for everyday temperature measurement. The degree Celsius (symbol: °C) can refer to a specific temperature on the Celsius scale or a unit to indicate a difference between two temperatures or an uncertainty. It is named after the Swedish astronomer Anders Celsius (1701–1744), who developed a similar temperature scale. Before being renamed to honor Anders Celsius in 1948, the unit was called centigrade, from the Latin centum, which means 100, and gradus, which means steps.\n" +
    "Since 1743 the Celsius scale has been based on 0 °C for the freezing point of water and 100 °C for the boiling point of water at 1 atm pressure. Prior to 1743 the values were reversed (i.e. the boiling point was 0 degrees and the freezing point was 100 degrees). The 1743 scale reversal was proposed by Jean-Pierre Christin.\n" +
    "By international agreement, between 1954 and 2019 the unit degree Celsius and the Celsius scale were defined by absolute zero and the triple point of Vienna Standard Mean Ocean Water (VSMOW), a precisely defined water standard. This definition also precisely related the Celsius scale to the Kelvin scale, which defines the SI base unit of thermodynamic temperature with symbol K. Absolute zero, the lowest temperature possible, is defined as being exactly 0 K and −273.15 °C. Until 19 May 2019, the temperature of the triple point of water was defined as exactly 273.16 K (0.01 °C). This means that a temperature difference of one degree Celsius and that of one kelvin are exactly the same.On 20 May 2019, the kelvin was redefined so that its value is now determined by the definition of the Boltzmann constant rather than being defined by the triple point of VSMOW. This means that the triple point is now a measured value, not a defined value. The newly-defined exact value of the Boltzmann constant was selected so that the measured value of the VSMOW triple point is exactly the same as the older defined value to within the limits of accuracy of contemporary metrology. The degree Celsius remains exactly equal to the kelvin, and 0 K remains exactly −273.15 °C.",
};

const round = (num, precision) => Math.round((num + Number.EPSILON) * (10 ** precision)) / (10 ** precision);

const convert = (scale, value, precision=4) => {
  if (isNaN(value) || value === "") {
    const values = {
      Celsius: scale === "Celsius" ? value : "",
    };
    for (const scaleName of scalesArray)
      values[scaleName] = scale === scaleName ? value : "";
    return values;
  }

  const inCelsius =
    scale === "Celsius"
      ? round(Number(value), precision)
      : round(scales[scale].toC(Number(value)), precision);
  const values = {
    Celsius: inCelsius,
  };

  values[scale] = value;
  for (const [scaleName, { fromC }] of Object.entries(scales)) {
    if (scale === scaleName) continue;
    values[scaleName] = round(fromC(inCelsius), precision);
  }
  return values;
};

export { convert, descriptions, scalesArray as scales };
