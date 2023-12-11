import requests as req
import codecs
import json
import pandas as pd
import datetime
import time
import sys


def transformar_fecha(texto):
    try:
        fecha = datetime.datetime.strptime(texto,"%Y-%m-%dT%H:%M:%S")
    except:
        fecha = None
    return fecha

def GetFecha(texto):
    try:
        return datetime.datetime.strptime(texto,"%Y-%m-%d %H:%M:%S")
    except:
        try:
            return datetime.datetime.strptime(texto.split(" "),"%Y-%m-%d")
        except:
            return texto

def ChangeT(texto):
    try:
        return texto.replace("T"," ")
    except:
        return texto


def proceso2():
    print("Comenzamos publicadas...")
    ref = pd.read_excel("https://github.com/Sud-Austral/ACTION_LICITACION/raw/main/licitaciones_publicadas_2019.xlsx")
    
    now = datetime.datetime.now()
    #now now
    start = ref["FechaPublicada"].max()
    salida = []
    avance = start
    while avance < now:
        print(avance.strftime("%d%m%y"))
        fecha = avance.strftime("%d%m") + "20" + avance.strftime("%y")        
        url = f"https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha={fecha}&estado=publicada&ticket=BC2B1276-7EF0-48FA-9EA8-888BFD8D11FE"
        #print(url)
        flag = True
        while flag:
            flag2 = True
            while flag2: 
                try:
                    response = req.get(url)
                    flag2 = False
                except:
                    print("error",url)
                
            
            decoded_data=codecs.decode(response.content, 'utf-8-sig')
            d = json.loads(decoded_data)
            print(d)
            try:            
                df = pd.DataFrame(d["Listado"])
                df["FechaPublicada"] = avance
                salida.append(df)
                flag = False
                #print(f"Exito en {fecha}")
            except:
                print(f"error en {fecha}")
                error = sys.exc_info()[1]
                print(error)
        time.sleep(2)
        avance += datetime.timedelta(days = 1)
    final = pd.concat(salida)
    final["Link"] = final["CodigoExterno"].apply(lambda x: f"http://www.mercadopublico.cl/fichaLicitacion.html?idLicitacion={x}")
    print("Largo de los nuevos")
    print(len(final))
    print("Fecha maxima")
    print(final["FechaPublicada"].max())
    tabla_final = pd.concat([ref,final])
    
    tabla_final = tabla_final.drop_duplicates()

    #tabla_final["FechaCierre"]=tabla_final["FechaCierre"].apply(transformar_fecha)
    tabla_final = tabla_final.dropna(subset=['FechaCierre'])
    tabla_final["FechaCierre"] = tabla_final["FechaCierre"].apply(ChangeT)
    tabla_final["FechaCierre"] = tabla_final["FechaCierre"].apply(GetFecha)
    tabla_final = tabla_final.drop_duplicates(subset=['CodigoExterno'])
    
    tabla_final.to_excel("licitaciones_publicadas_2019.xlsx", index=False)

    print("Largo de los nuevos")
    print(len(tabla_final))
    print("Fecha maxima")
    print(tabla_final["FechaPublicada"].max())
    print("*****************************************")
    print("*****************************************")
    print("*****************************************")
    print("*****************************************")
    print("*****************************************")
    print("Fin ")
    return

if __name__ == '__main__':
    print("Publicadas...")
    #proceso2()