TIME_LIMIT=60

VAMPIRE=./vampire_with_fool
SATALLAX=/Users/evgenyk/Downloads/satallax-2.8/bin/satallax.opt
LEO=/Users/evgenyk/Downloads/leo2/bin/leo
ISABELLE=/Applications/Isabelle2015.app/Isabelle/bin/isabelle

# GNU date
DATE=gdate

for f in `ls thf-fool-experiments`
do
  SAT="$(cat thf-experiments/$f | fgrep -e "Status   : Satisfiable" -e "Status   : CounterSatisfiable" | wc -l | tr -d '\n')"
  # a better way would be to read SPC, but it's not marked correctly for some problems
  if [ ${SAT} == "1" ]; then
    VAMPIRE_MODE=casc_sat
  else
    VAMPIRE_MODE=casc
  fi

  echo -n $f
  echo -en '\t'

  VAMPIRE_TIME="$(${DATE} +%s%6N)"
  VAMPIRE_OUTPUT=`${VAMPIRE} --mode ${VAMPIRE_MODE} -m 20000 -t ${TIME_LIMIT} --fool_paramodulation on "thf-fool-experiments/$f"`
  VAMPIRE_TIME="$(($(${DATE} +%s%6N)-VAMPIRE_TIME))"
  echo -n "${VAMPIRE_MODE}"
  echo -en '\t'
  echo -n "${VAMPIRE_OUTPUT}" | sed -n 's/.*SZS status \([^ ]*\).*/\1/p' | tr -d '\n'
  echo -en '\t'
  echo -n "${VAMPIRE_TIME}"
  echo -en '\t'
  echo -n "${VAMPIRE_OUTPUT}" | sed -n 's/.*Generated clauses: \([^ ]*\).*/\1/p' | tail -1 | tr -d '\n'

  echo -en '\t'

  VAMPIRE2_TIME="$(${DATE} +%s%6N)"
  VAMPIRE2_OUTPUT=`${VAMPIRE} --mode ${VAMPIRE_MODE} -m 20000 -t ${TIME_LIMIT} --fool_ordering off --fool_paramodulation off "thf-fool-experiments/$f"`
  VAMPIRE2_TIME="$(($(${DATE} +%s%6N)-VAMPIRE2_TIME))"
  echo -n "${VAMPIRE2_OUTPUT}" | sed -n 's/.*SZS status \([^ ]*\).*/\1/p' | tr -d '\n'
  echo -en '\t'
  echo -n "${VAMPIRE2_TIME}"
  echo -en '\t'
  echo -n "${VAMPIRE2_OUTPUT}" | sed -n 's/.*Generated clauses: \([^ ]*\).*/\1/p' | tail -1 | tr -d '\n'

  echo -en '\t'

  SATALLAX_TIME="$(gdate +%s%6N)"
  SATALLAX_OUTPUT=`${SATALLAX} -verb 5 -t ${TIME_LIMIT} "thf-experiments/$f"`
  SATALLAX_TIME="$(($(gdate +%s%6N)-SATALLAX_TIME))"
  echo -n "${SATALLAX_OUTPUT}" | sed -n 's/.*SZS status \([^* ]*\).*/\1/p' | tr -d '\n'
  echo -en '\t'
  echo -en "${SATALLAX_TIME}" # elapsed time
  echo -en '\t'
  # Number of generated clauses: a sum for each subgoal?
  echo -n "${SATALLAX_OUTPUT}" | sed -n 's/.*Proof found for a goal\.\.\.\([^* ]*\) clauses.*/\1/p' | awk '{s+=$1} END  {print s}' | tr -d '\n'

  echo -en '\t'

  LEO_TIME="$(gdate +%s%6N)"
  LEO_OUTPUT=`${LEO} --timeout ${TIME_LIMIT} --proofoutput 1 "thf-experiments/$f"`
  LEO_TIME="$(($(gdate +%s%6N)-LEO_TIME))"
  # wtf? status is output twice
  echo -n "${LEO_OUTPUT}" | sed -n 's/.*SZS status \([^* ]*\).*/\1/p' | head -n 1 | tr -d '\n'
  echo -en '\t'
  echo -en "${LEO_TIME}" # elapsed time
  #echo -en '\t'
  #no slauses information
  echo -en '\t'

  ISABELLE_TIME="$(gdate +%s%6N)"
  ISABELLE_OUTPUT=`${ISABELLE} tptp_isabelle ${TIME_LIMIT} "thf-experiments/$f"`
  ISABELLE_TIME="$(($(gdate +%s%6N)-ISABELLE_TIME))"
  # wtf? status is output twice
  echo -n "${ISABELLE_OUTPUT}" | sed -n 's/.*SZS status \([^* ]*\).*/\1/p' | head -n 1 | tr -d '\n'
  echo -en '\t'
  echo -en "${ISABELLE_TIME}" # elapsed time
  #echo -en '\t'
  #no slauses information
  echo -en '\t'

  echo
done
