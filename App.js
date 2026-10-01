import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TextInput, Switch, Pressable, Modal, Alert, StyleSheet } from 'react-native';

const MENSAGENS = [
  'Você tem uma nova mensagem!',
  'Lembrete: beba água',
  'Alguém visitou seu perfil!',
  'Não esqueça de atualizar sua bio.',
  'Bom trabalho! Continue assim!',
];

export default function App() {
  const [bio, setBio] = useState('');
  const [textoBio, setTextoBio] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(false);

  function abrirModal() {
    setTextoBio(bio);
    setModalVisivel(true);
  }

  function salvarBio() {
    setBio(textoBio);
    setModalVisivel(false);
  }

  function salvarDados() {
    Alert.alert('Salvar', 'Dados salvos com sucesso!');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#8f8f8f' }}>
      <Notificacao ativa={notificacoesAtivas} />

      <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20, gap: 20 }}>

        <Image
          source={require('./assets/foto.jpg')}
          style={{ width: 140, height: 140, borderRadius: 70, marginTop: 20 }}
        />

        <Text style={styles.nome}>Duda Franco</Text>

        <View style={styles.secao}>
          <Text style={styles.titulo}>Bio</Text>
          <Text style={styles.bio}>{bio}</Text>
          <Pressable style={styles.botaoContorno} onPress={abrirModal}>
            <Text style={styles.textoContorno}>Editar Bio</Text>
          </Pressable>
        </View>

        <View style={styles.secao}>
          <Text style={styles.titulo}>Configurações</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 16 }}>Receber Notificações</Text>
            <Switch value={notificacoesAtivas} onValueChange={setNotificacoesAtivas} />
          </View>
        </View>

        <Pressable style={styles.botao} onPress={salvarDados}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </Pressable>

      </ScrollView>

      <Modal visible={modalVisivel} animationType="slide" transparent={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 20 }}>
            <Text style={styles.titulo}>Editar Bio</Text>
            <TextInput
              style={styles.input}
              value={textoBio}
              onChangeText={setTextoBio}
              placeholder="Escreva sua bio..."
              multiline={true}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Pressable style={styles.botaoContorno} onPress={() => setModalVisivel(false)}>
                <Text style={styles.textoContorno}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.botao} onPress={salvarBio}>
                <Text style={styles.textoBotao}>Salvar bio</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function Notificacao({ ativa }) {
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    if (!ativa) {
      setMensagem(null);
      return;
    }

    const intervalo = setInterval(() => {
      const sorteio = Math.floor(Math.random() * MENSAGENS.length);
      setMensagem(MENSAGENS[sorteio]);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [ativa]);

  useEffect(() => {
    if (!mensagem) return;
    const timer = setTimeout(() => setMensagem(null), 3000);
    return () => clearTimeout(timer);
  }, [mensagem]);

  if (!mensagem) return null;

  return (
    <View style={styles.notificacao}>
      <Text style={{ color: '#fff', textAlign: 'center' }}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secao: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '600',
  },
  bio: {
    fontSize: 16,
    color: '#444',
    minHeight: 24,
  },
  botao: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoContorno: {
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  textoContorno: {
    color: '#222',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    marginVertical: 16,
  },
  notificacao: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 14,
    zIndex: 10,
  },
});