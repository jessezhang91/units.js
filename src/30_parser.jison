/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s*\n\s*										// Ignore
[0-9]+("."[0-9]+)?([eE][\+\-]?[0-9]+)?\b		return 'NUMBER'
\s*"*"\s*										return '*'
\s*"/"\s*										return '/'
\s*"-"\s*										return '-'
\s*"+"\s*										return '+'
\s*"^"\s*										return '^'
"("\s*											return '('
\s*")"											return ')'
"["\s*											return '['
\s*"]"											return ']'
"{"\s*											return '{'
\s*"}"											return '}'
[A-Za-z]+										return 'UNIT'
\s+"to"\s+										return 'to'
\s+												return 'SEP'
<<EOF>>											return 'EOF'
.												return 'INVALID'

/lex

/* operator associations and precedence */

%left 'to'
%left UNITGROUP
%left UNITDIVIDE
%left '+' '-'
%left '*' '/'
%left UMINUS
%left '^'

%start expression

%% /* language grammar */

expression
	: ng 'to' u EOF
		{
			return units_convert($1, $3);
		}
	| ng EOF
		{
			return $1;
		}
	| u EOF
		{
			return units_convert({
				value: 1,
				unit: $1
			}).unit;
		}
	;

ng
	: ng '+' ng
		{
			$$ = units_add($1, $3);
		}
	| ng '-' ng
		{
			$$ = units_subtract($1, $3);
		}
	| ng '*' ng
		{
			$$ = units_times($1, $3);
		}
	| ng '/' ng
		{
			$$ = units_divide($1, $3);
		}
	| ng '^' NUMBER
		{
			$$ = units_power($1, Number($3));
		}
	| '-' ng %prec UMINUS
		{
			$$ = {
				value: -$2.value,
				unit: $2.unit
			};
		}
	| '(' ng ')'
		{
			$$ = $2;
		}
	| '[' ng ']'
		{
			$$ = $2;
		}
	| '{' ng '}'
		{
			$$ = $2;
		}
	| NUMBER SEP u %prec UNITGROUP
		{
			$$ = units_convert({
				value: Number($1),
				unit: $3
			});
		}
	| NUMBER
		{
			$$ = {
				value: Number($1),
				unit: []
			};
		}
	;

u
	: u '/' u %prec UNITDIVIDE
		{
			$$ = units_udivide($1, $3);
		}
	| u '*' u
		{
			$$ = units_utimes($1, $3);
		}
	| u '^' NUMBER %prec UNITPOWER
		{
			$$ = units_upower($1, Number($3));
		}
	| u '^' '-' NUMBER %prec UNITPOWER
		{
			$$ = units_upower($1, -Number($4));
		}
	| '(' u ')'
		{
			$$ = $2;
		}
	| UNIT
		{
			$$ = units_parseUnit($1);
		}
	;