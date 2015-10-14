TIME_LIMIT=60

VAMPIRE=./vampire_with_fool
SATALLAX=satallax.opt
LEO=leo
ISABELLE=isabelle

# GNU date
DATE=gdate

for FILE in `ls tptp-problems/thf`
do
  THF_FILE="tptp-problems/thf/${FILE}"
  TFF_FILE="tptp-problems/fool-tff/${FILE}"

  SAT="$(cat ${THF_FILE} | fgrep -e "Status   : Satisfiable" -e "Status   : CounterSatisfiable" | wc -l | tr -d '\n')"
  # a better way would be to read SPC, but it's not marked correctly for some problems
  if [ ${SAT} == "1" ]; then
    VAMPIRE_MODE=casc_sat
  else
    VAMPIRE_MODE=casc
  fi

  echo -n "${FILE}"
  echo -en '\t'

  VAMPIRE_TIME="$(${DATE} +%s%6N)"
  VAMPIRE_OUTPUT=`${VAMPIRE} --mode ${VAMPIRE_MODE} -m 20000 -t ${TIME_LIMIT} --fool_paramodulation on "${TFF_FILE}"`
  VAMPIRE_TIME="$(($(${DATE} +%s%6N)-VAMPIRE_TIME))"
  echo -n "${VAMPIRE_MODE}"
  echo -en '\t'
  echo -n "${VAMPIRE_OUTPUT}" | sed -n 's/.*SZS status \([^ ]*\).*/\1/p' | tr -d '\n'
  echo -en '\t'
  echo -n "${VAMPIRE_TIME}"
  echo -en '\t'

  VAMPIRE2_TIME="$(${DATE} +%s%6N)"
  VAMPIRE2_OUTPUT=`${VAMPIRE} --mode ${VAMPIRE_MODE} -m 20000 -t ${TIME_LIMIT} --fool_ordering off --fool_paramodulation off "${TFF_FILE}"`
  VAMPIRE2_TIME="$(($(${DATE} +%s%6N)-VAMPIRE2_TIME))"
  echo -n "${VAMPIRE2_OUTPUT}" | sed -n 's/.*SZS status \([^ ]*\).*/\1/p' | tr -d '\n'
  echo -en '\t'
  echo -n "${VAMPIRE2_TIME}"
  echo -en '\t'

  SATALLAX_TIME="$(gdate +%s%6N)"
  SATALLAX_OUTPUT=`${SATALLAX} -verb 5 -t ${TIME_LIMIT} "${THF_FILE}"`
  SATALLAX_TIME="$(($(gdate +%s%6N)-SATALLAX_TIME))"
  echo -n "${SATALLAX_OUTPUT}" | sed -n 's/.*SZS status \([^* ]*\).*/\1/p' | tr -d '\n'
  echo -en '\t'
  echo -en "${SATALLAX_TIME}"
  echo -en '\t'

  LEO_TIME="$(gdate +%s%6N)"
  LEO_OUTPUT=`${LEO} --timeout ${TIME_LIMIT} --proofoutput 1 "${THF_FILE}"`
  LEO_TIME="$(($(gdate +%s%6N)-LEO_TIME))"
  echo -n "${LEO_OUTPUT}" | sed -n 's/.*SZS status \([^* ]*\).*/\1/p' | head -n 1 | tr -d '\n'
  echo -en '\t'
  echo -en "${LEO_TIME}"
  echo -en '\t'

  ISABELLE_TIME="$(gdate +%s%6N)"
  ISABELLE_OUTPUT=`${ISABELLE} tptp_isabelle ${TIME_LIMIT} "${THF_FILE}"`
  ISABELLE_TIME="$(($(gdate +%s%6N)-ISABELLE_TIME))"
  echo -n "${ISABELLE_OUTPUT}" | sed -n 's/.*SZS status \([^* ]*\).*/\1/p' | head -n 1 | tr -d '\n'
  echo -en '\t'
  echo -en "${ISABELLE_TIME}"
  echo -en '\t'

  echo
done
