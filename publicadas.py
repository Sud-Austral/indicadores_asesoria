import pandas as pd

def proceso2():
    print("Comenzamos publicadas...")
    df = pd.read_excel("Tabla_buscador_indicadores.xlsx")
    #print("Comenzamos publicadas... 1")
    base = ['Indicador', 'Capítulo', 'Categoría GEO (UNEP)', 'Categoría EAG (OECD)','Enlace visualización IFG','ODS', 'Fuente', 'Nombre indicador separado']
    df_unpivoted = pd.melt(df, id_vars=base, var_name='Región', value_name='Valor')
    #print("Comenzamos publicadas...2")
    df_unpivoted = df_unpivoted[df_unpivoted["Valor"] == "SI"]
    #print("Comenzamos publicadas...3 ")
    with open('registro.json', 'w', encoding='utf-8') as file:
        df_unpivoted.to_json(file, orient ='records',force_ascii=False,indent=1)
    
    

if __name__ == '__main__':
    print("Publicadas...")
    proceso2()