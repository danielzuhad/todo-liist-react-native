import { SafeAreaView } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import tw from "tailwind-react-native-classnames";
import AgendaView from "@/components/Agenda/AgendaView";
import { AgendaProvider } from "@/context/AgendaContext";

export default function HomeScreen() {
  return (
    <SafeAreaView style={tw`flex-1 px-2 pt-20 bg-white `}>
      <ThemedView style={tw`flex items-center justify-center w-full `}>
        <ThemedText type="title" style={tw`text-3xl font-bold`}>
          Task Planner
        </ThemedText>
      </ThemedView>

      <AgendaProvider>
        <AgendaView />
      </AgendaProvider>
    </SafeAreaView>
  );
}
