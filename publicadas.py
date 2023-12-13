import pandas as pd

def proceso2():
    #Se lee el archivo Tabla_buscador_indicadores.xlsx
    df = pd.read_excel("Tabla_buscador_indicadores.xlsx")
    #Se definen las columnas que se mantendran
    base = ['Indicador', 'Capítulo', 'Categoría GEO (UNEP)', 'Categoría EAG (OECD)','Enlace visualización IFG','ODS', 'Fuente', 'Nombre indicador separado']
    #Se mantienen las columnas definidas en base y se crean 2 columnas nuevas, Región y Valor
    df_unpivoted = pd.melt(df, id_vars=base, var_name='Región', value_name='Valor')
    #Solo se conservan los registros con Valor SI
    df_unpivoted = df_unpivoted[df_unpivoted["Valor"] == "SI"]
    #Se guarda los registros para ser utilizadops más tarde
    with open('registro.json', 'w', encoding='utf-8') as file:
        df_unpivoted.to_json(file, orient ='records',force_ascii=False,indent=1)
    
    

if __name__ == '__main__':
    print("Publicadas...")
    proceso2()