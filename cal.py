#%%
import pandas as pd 

a = pd.DataFrame()

a['income'] = [8,11,9,6,6]
a['saving'] = [0.6,1.2,1.0,0.7,0.3]

#%%

print(a['income'].std())
print(a['saving'].std())
print(a.cov())
print(a.corr())
# print(a.describe())
