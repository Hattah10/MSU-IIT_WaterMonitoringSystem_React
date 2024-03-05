import { Link } from "react-router-dom";
import Sidebar from "../../components/navbars/Sidebar";
import Topbar from "../../components/navbars/Topbar";
import Chart from "../../components/charts/Chart";
import { collection, getDocs, where, query, limit } from "@firebase/firestore";
import { db } from "../../config/firestore";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [usageCCSRight, setUsageCCSRight] = useState();
  const [usageCCSLeft, setUsageCCSLeft] = useState();
  const [usageDormLeft, setUsageDormLeft] = useState();
  const [usageDormRight, setUsageDormRight] = useState();

  const getUsageCCSRight = async () => {
    try {
      const q = query(
        collection(db, "CCS"),
        where("location", "==", "CCSRight")
        // limit(10)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setUsageCCSRight(data);

      console.log("Filtered Data:", data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getUsageCCSLeft = async () => {
    try {
      const q = query(
        collection(db, "CCS"),
        where("location", "==", "CCSLeft")
        // limit(10)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setUsageCCSLeft(data);

      console.log("Filtered Data:", data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getUsageDormLeft = async () => {
    try {
      const q = query(
        collection(db, "Dorm"),
        where("location", "==", "DormLeft")
        // limit(10)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setUsageDormLeft(data);

      console.log("Filtered Data:", data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getUsageDormRight = async () => {
    try {
      const q = query(
        collection(db, "Dorm"),
        where("location", "==", "DormRight")
        // limit(10)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setUsageDormRight(data);

      console.log("Filtered Data:", data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      // Fetch updated data from Firestore
      await getUsageCCSRight();
      await getUsageCCSLeft();
      await getUsageDormLeft();
      await getUsageDormRight();
    }, 10000); // Update every 10 seconds

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Sidebar />
      <section id="content" className="content">
        <Topbar />
        <main>
          <h1 className="title">Dashboard</h1>
          <ul className="breadcrumbs">
            <li>
              <Link to="#" className="a">
                Home
              </Link>
            </li>
            <li className="divider">/</li>
            <li>
              <Link to="#" className="a active">
                Dashboard
              </Link>
            </li>
          </ul>

          {/* insert chart components */}
          <div className="data-viz">
            {/* colors */}
            <Chart
              data={usageCCSLeft}
              colors="#1b998b"
              location="Left"
              building="CCS"
            />
            <Chart
              data={usageCCSRight}
              colors="#1b998b"
              location="Right"
              building="CCS"
            />
            <Chart
              data={usageDormLeft}
              colors="#7b2cbf"
              location="Left"
              building="Dorm"
            />
            <Chart
              data={usageDormRight}
              colors="#7b2cbf"
              location="Right"
              building="Dorm"
            />
          </div>
        </main>
      </section>
    </div>
  );
};

export default Dashboard;
