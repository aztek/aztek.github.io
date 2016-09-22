TIME_LIMIT=60

VAMPIRE=./vampire
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

  VAMPIRE_TIME="$(${DATE} +%s%6N)"
  VAMPIRE_OUTPUT=`${VAMPIRE} --mode casc_sat -m 20000 -t ${TIME_LIMIT}s --fool_paramodulation on --newcnf off "${TFF_FILE}"`
  VAMPIRE_TIME="$(($(${DATE} +%s%6N)-VAMPIRE_TIME))"
  echo -n "${VAMPIRE_OUTPUT}" | sed -n 's/.*SZS status \([^ ]*\).*/\1/p' | tr -d '\n'
  echo -en '\t'
  echo -n "${VAMPIRE_TIME}"
  echo -en '\t'

  VAMPIRE_TIME="$(${DATE} +%s%6N)"
  VAMPIRE_OUTPUT=`${VAMPIRE} --mode casc_sat -m 20000 -t ${TIME_LIMIT}s --newcnf on "${TFF_FILE}"`
  VAMPIRE_TIME="$(($(${DATE} +%s%6N)-VAMPIRE_TIME))"
  echo -n "${VAMPIRE_OUTPUT}" | sed -n 's/.*SZS status \([^ ]*\).*/\1/p' | tr -d '\n'
  echo -en '\t'
  echo -n "${VAMPIRE_TIME}"
  echo -en '\t'

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

# filter out unsat problem with grep 'unsat|Unsatisfiable'