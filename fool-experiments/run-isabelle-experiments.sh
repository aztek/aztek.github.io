TIME_LIMIT=60

VAMPIRE=./vampire_with_fool
CVC4=cvc4
Z3=z3

# GNU timeout
TIMEOUT=gtimeout

# GNU date
DATE=gdate

for PROBLEM in `cat isabelle-problems/problems.txt`
do
  SMT_FILE="isabelle-problems/${PROBLEM}.smt_in"
  TFF_FILE="isabelle-problems/${PROBLEM}.smt_in.p"

  echo -n "${PROBLEM}"
  echo -en '\t'

  for VAMPIRE_MODE in "casc_sat" "casc"
  do
    VAMPIRE_TIME="$(${DATE} +%s%6N)"
    VAMPIRE_OUTPUT=`${VAMPIRE} --mode ${VAMPIRE_MODE} -m 20000 -t ${TIME_LIMIT}s --fool_paramodulation on "${TFF_FILE}"`
    VAMPIRE_TIME="$(($(${DATE} +%s%6N)-VAMPIRE_TIME))"
    echo -n "${VAMPIRE_MODE}"
    echo -en '\t'
    echo -n "${VAMPIRE_OUTPUT}" | sed -n 's/.*SZS status \([^ ]*\).*/\1/p' | tr -d '\n'
    echo -en '\t'
    echo -n "${VAMPIRE_TIME}"
    echo -en '\t'
  done

  for VAMPIRE_MODE in "casc_sat" "casc"
  do
    VAMPIRE_TIME="$(${DATE} +%s%6N)"
    VAMPIRE_OUTPUT=`${VAMPIRE} --mode ${VAMPIRE_MODE} -m 20000 -t ${TIME_LIMIT}s --fool_paramodulation off --fool_ordering off "${TFF_FILE}"`
    VAMPIRE_TIME="$(($(${DATE} +%s%6N)-VAMPIRE_TIME))"
    echo -n "${VAMPIRE_MODE}"
    echo -en '\t'
    echo -n "${VAMPIRE_OUTPUT}" | sed -n 's/.*SZS status \([^ ]*\).*/\1/p' | tr -d '\n'
    echo -en '\t'
    echo -n "${VAMPIRE_TIME}"
    echo -en '\t'
  done

  CVC4_TIME="$(${DATE} +%s%6N)"
  # have to use gtimeout because CVC4 ignores the --tlimit option sometimes
  CVC4_OUTPUT=`${TIMEOUT} 61s ${CVC4} --lang smt --output-lang tptp --tlimit=${TIME_LIMIT}000 "${SMT_FILE}"`
  CVC4_TIME="$(($(${DATE} +%s%6N)-CVC4_TIME))"
  echo -n "${CVC4_OUTPUT}" | sed -n 's/.*SZS status \([^* ]*\).*/\1/p' | tr -d '\n'
  echo -en '\t'
  echo -en "${CVC4_TIME}"

  Z3_TIME="$(${DATE} +%s%6N)"
  Z3_OUTPUT=`${Z3} -smt2 -T:${TIME_LIMIT} "${SMT_FILE}" 2>&-`
  Z3_TIME="$(($(${DATE} +%s%6N)-Z3_TIME))"
  echo -n "${Z3_OUTPUT}" | fgrep -v error | tr -d '\n'
  echo -en '\t'
  echo -en "${Z3_TIME}"

  echo
done
