VAMPIRE="./vampire --newcnf on -sa discount -t 60s"

for benchmark in count_two count_two_flag count_three two_arrays three_arrays
do
	echo -en ${benchmark} '\t'
	for unrolls in 2 3 4 5
	do
		FILE="${benchmark}/${benchmark}${unrolls}.p"
		VAMPIRE_TIME="$(gdate +%s%6N)"
		VAMPIRE_OUTPUT=`${VAMPIRE} ${FILE}`
		VAMPIRE_STATUS=$?
		VAMPIRE_TIME="$(($(gdate +%s%6N)-VAMPIRE_TIME))"
		if [ ${VAMPIRE_STATUS} != 0 ]
		then
			echo -n '-'
		else
			echo -n `bc -l <<< "scale=3; ${VAMPIRE_TIME}/1000000"`
		fi
		echo -en '\t'
	done
	echo
done
