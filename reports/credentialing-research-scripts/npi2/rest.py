import sys; sys.path.insert(0,'.')
import states
from concurrent.futures import ThreadPoolExecutor
r=lambda a,b: list(range(a,b+1))
states.ZIP.update({"AL":r(350,369),"AK":r(995,999),"AR":r(716,729),"DE":r(197,199),"DC":r(200,205),"HI":r(967,968),"ID":r(832,838),"IN":r(460,479),"IA":r(500,528),"KS":r(660,679),"KY":r(400,427),"LA":r(700,714),"ME":r(39,49),"MD":r(206,219),"MI":r(480,499),"MN":r(550,567),"MS":r(386,397),"MO":r(630,658),"MT":r(590,599),"NE":r(680,693),"NV":r(889,898),"NH":r(30,38),"NM":r(870,884),"ND":r(580,588),"OH":r(430,459),"OK":r(730,749),"OR":r(970,979),"RI":r(28,29),"SC":r(290,299),"SD":r(570,577),"TN":r(370,385),"UT":r(840,847),"VT":r(50,59),"VA":[201]+r(220,246),"WV":r(247,268),"WI":r(530,549),"WY":r(820,831)})
sts=[s for s in states.ZIP if s not in ["NY","NJ","CT","PA","FL","TX","CA","MA","IL","GA","NC","AZ","CO","WA"]]
with ThreadPoolExecutor(6) as ex: list(ex.map(states.do_state,sts))
